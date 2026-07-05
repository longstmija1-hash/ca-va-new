import { writeFileSync, readFileSync, existsSync, appendFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "../lib/reviews-fetched.json");

const GIS_BRANCH_ID = "70000001094230814";
const GIS_URL = `https://2gis.ru/ekaterinburg/firm/${GIS_BRANCH_ID}/tab/reviews`;
const YANDEX_URL =
  "https://yandex.ru/maps/org/sa_va/97118654142/reviews/?ll=60.604877%2C56.854818&tab=reviews&z=16.69";

const LIMIT = 3;
const USER_AGENT = "Mozilla/5.0";
const MIN_HTML_BYTES = 50_000;
const FETCH_ATTEMPTS = 3;

const MONTHS = {
  января: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
};

function parseRussianDate(value) {
  const match = value.match(/(\d{1,2})\s+([а-яё]+)\s+(\d{4})/i);
  if (!match) return 0;
  const day = Number(match[1]);
  const month = MONTHS[match[2].toLowerCase()];
  const year = Number(match[3]);
  if (month === undefined) return 0;
  return Date.UTC(year, month, day);
}

function normalizeText(text) {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/Читать целиком$/i, "")
    .replace(/[—–]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function avatarFromAuthor(author) {
  const letter = author.trim().charAt(0).toUpperCase();
  return letter || "?";
}

function isValidAuthor(author) {
  if (!author || author.length < 3) return false;
  if (/ca va|салон|подписаться/i.test(author)) return false;
  if (/^["«]/.test(author)) return false;
  const parts = author.split(/\s+/);
  if (parts.every((part) => part.length <= 2)) return false;
  return true;
}

function dedupeReviews(reviews) {
  const seen = new Set();
  return reviews.filter((review) => {
    const key = `${review.author}:${review.text.slice(0, 40)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      "Accept-Language": "ru-RU,ru;q=0.9",
      Accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.text();
}

async function fetchHtmlWithRetry(url) {
  let lastError;

  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt += 1) {
    try {
      const html = await fetchHtml(url);
      if (html.length < MIN_HTML_BYTES) {
        throw new Error(
          `Response too small (${html.length} bytes), likely blocked`,
        );
      }
      return html;
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`Attempt ${attempt}/${FETCH_ATTEMPTS} failed for ${url}: ${message}`);
      if (attempt < FETCH_ATTEMPTS) {
        await sleep(2000 * attempt);
      }
    }
  }

  throw lastError;
}

async function fetch2GisViaApi() {
  const apiKey = process.env.TWO_GIS_API_KEY;
  if (!apiKey) return null;

  const url = new URL(
    `https://public-api.reviews.2gis.com/3.0/branches/${GIS_BRANCH_ID}/reviews`,
  );
  url.searchParams.set("limit", String(LIMIT));
  url.searchParams.set("offset", "0");
  url.searchParams.set("key", apiKey);

  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!response.ok) {
    throw new Error(`2GIS API HTTP ${response.status}`);
  }

  const data = await response.json();
  const items = data?.reviews ?? data?.result?.reviews ?? [];
  return items
    .map((item) => {
      const author = item.user?.name ?? item.author ?? "";
      const text = normalizeText(item.text ?? "");
      if (!isValidAuthor(author) || text.length < 20) return null;
      return {
        author,
        source: "2ГИС",
        avatar: avatarFromAuthor(author),
        text,
        date: item.date_created ?? item.created_at ?? "",
        sortKey: item.date_created ? Date.parse(item.date_created) : 0,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.sortKey - a.sortKey)
    .slice(0, LIMIT)
    .map(({ sortKey: _sortKey, ...review }) => review);
}

async function fetch2GisViaHtml() {
  const html = await fetchHtmlWithRetry(GIS_URL);
  const $ = cheerio.load(html);
  const reviews = [];

  $("div._1rowqpjv").each((_, element) => {
    const card = $(element);
    const author = card
      .find("span[title]")
      .filter((__, span) => {
        const title = $(span).attr("title") ?? "";
        return isValidAuthor(title);
      })
      .first()
      .attr("title");

    const text = normalizeText(
      card
        .find("a")
        .filter((__, anchor) => $(anchor).text().trim().length >= 30)
        .first()
        .text(),
    );

    if (!author || text.length < 20) return;
    reviews.push({
      author,
      source: "2ГИС",
      avatar: avatarFromAuthor(author),
      text,
      date: "",
      sortKey: reviews.length,
    });
  });

  if (reviews.length === 0) {
    throw new Error("2GIS HTML parsed 0 reviews");
  }

  return dedupeReviews(reviews)
    .slice(0, LIMIT)
    .map(({ sortKey: _sortKey, date: _date, ...review }) => review);
}

async function fetchYandexReviews() {
  const html = await fetchHtmlWithRetry(YANDEX_URL);
  const $ = cheerio.load(html);
  const reviews = [];

  $(".business-reviews-card-view__review").each((_, element) => {
    const card = $(element);
    const author = card.find(".business-review-view__author-name").text().trim();
    const text = normalizeText(card.find(".business-review-view__body").text());
    const date = card.find(".business-review-view__date").text().trim();

    if (!isValidAuthor(author) || text.length < 20) return;
    reviews.push({
      author,
      source: "Яндекс",
      avatar: avatarFromAuthor(author),
      text,
      date,
      sortKey: parseRussianDate(date),
    });
  });

  if (reviews.length === 0) {
    throw new Error("Yandex HTML parsed 0 reviews");
  }

  return dedupeReviews(reviews)
    .sort((a, b) => b.sortKey - a.sortKey)
    .slice(0, LIMIT)
    .map(({ sortKey: _sortKey, ...review }) => review);
}

async function fetchAllReviews() {
  const [gisResult, yandexResult] = await Promise.allSettled([
    (async () =>
      (await fetch2GisViaApi().catch(() => null)) ?? (await fetch2GisViaHtml()))(),
    fetchYandexReviews(),
  ]);

  const gis = gisResult.status === "fulfilled" ? gisResult.value : [];
  const yandex = yandexResult.status === "fulfilled" ? yandexResult.value : [];

  if (gisResult.status === "rejected") {
    console.warn("2GIS fetch failed:", gisResult.reason);
  }
  if (yandexResult.status === "rejected") {
    console.warn("Yandex fetch failed:", yandexResult.reason);
  }

  return { gis, yandex };
}

function pickReviews(gis, yandex, existing) {
  const existingGis =
    existing?.reviews?.filter((r) => r.source === "2ГИС") ?? [];
  const existingYandex =
    existing?.reviews?.filter((r) => r.source === "Яндекс") ?? [];

  const gisReviews = gis.length >= LIMIT ? gis : existingGis.slice(0, LIMIT);
  const yandexReviews =
    yandex.length >= LIMIT ? yandex : existingYandex.slice(0, LIMIT);

  return {
    reviews: [...gisReviews, ...yandexReviews],
    usedFallback: {
      gis: gis.length < LIMIT,
      yandex: yandex.length < LIMIT,
    },
    counts: { gis: gis.length, yandex: yandex.length },
  };
}

function loadExisting() {
  if (!existsSync(OUT_PATH)) return null;
  try {
    return JSON.parse(readFileSync(OUT_PATH, "utf8"));
  } catch {
    return null;
  }
}

function writeGithubSummary(payload, meta) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) return;

  const lines = [
    "## Reviews fetch",
    "",
    `- **Fetched at:** ${payload.fetchedAt}`,
    `- **2ГИС:** ${meta.counts.gis} fetched${meta.usedFallback.gis ? " (fallback)" : ""}`,
    `- **Яндекс:** ${meta.counts.yandex} fetched${meta.usedFallback.yandex ? " (fallback)" : ""}`,
    "",
    "### Cards on site",
    ...payload.reviews.map(
      (review) => `- **${review.source}** — ${review.author}`,
    ),
  ];

  appendFileSync(summaryPath, `${lines.join("\n")}\n`, "utf8");
}

async function main() {
  const existing = loadExisting();

  try {
    const { gis, yandex } = await fetchAllReviews();
    const { reviews, usedFallback, counts } = pickReviews(gis, yandex, existing);

    if (reviews.length < LIMIT * 2) {
      throw new Error(
        `Not enough reviews (${reviews.length}); need ${LIMIT} from each source`,
      );
    }

    const payload = {
      fetchedAt: new Date().toISOString(),
      reviews,
    };

    writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    writeGithubSummary(payload, { usedFallback, counts });

    const fallbackNote =
      usedFallback.gis || usedFallback.yandex
        ? ` (fallback: ${[
            usedFallback.gis ? "2ГИС" : null,
            usedFallback.yandex ? "Яндекс" : null,
          ]
            .filter(Boolean)
            .join(", ")})`
        : "";

    console.log(
      `Saved ${reviews.length} reviews (${counts.gis} 2GIS, ${counts.yandex} Yandex)${fallbackNote}`,
    );

    if (process.env.CI === "true" && (usedFallback.gis || usedFallback.yandex)) {
      console.warn(
        "::warning:: Some review sources used cached fallback on CI. Check if 2GIS/Yandex block GitHub runners.",
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (existing?.reviews?.length) {
      console.warn(`fetch-reviews: ${message}; keeping existing file`);
      if (process.env.CI === "true") {
        console.warn("::warning:: Review fetch failed completely; deploying cached reviews.");
      }
      return;
    }
    console.error(`fetch-reviews failed: ${message}`);
    process.exit(1);
  }
}

main();
