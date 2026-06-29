import { DISPLAY_REVIEWS } from "@/lib/reviews";
import {
  BOOKING_URL,
  PHONE,
  PHONE_HREF,
  REVIEW_LINKS,
  SOCIAL,
} from "@/lib/site-data";
import { Reveal } from "./Reveal";

export function ReviewsContacts() {
  return (
    <>
      <Reveal>
        <section className="reviews section" id="reviews">
          <div className="container">
            <h2>Отзывы</h2>
            <p className="section-lead">
              Собираем все отзывы гостей с 2ГИС и Яндекс Карт в одном месте.
            </p>

            <div className="reviews-summary">
              <div className="reviews-rating">
                <span className="reviews-rating-value">5</span>
                <span className="reviews-stars" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="reviews-rating-label">средняя оценка гостей</span>
              </div>
              <div className="reviews-sources">
                <a
                  className="reviews-source"
                  href={REVIEW_LINKS.gis}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="reviews-source-name">2ГИС</span>
                  <span className="reviews-source-score">5 ★</span>
                </a>
                <a
                  className="reviews-source"
                  href={REVIEW_LINKS.yandex}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="reviews-source-name">Яндекс Карты</span>
                  <span className="reviews-source-score">5 ★</span>
                </a>
              </div>
            </div>

            <div className="reviews-grid">
              {DISPLAY_REVIEWS.map((review) => (
                <figure key={review.author + review.text.slice(0, 20)} className="review-card">
                  <div className="review-card-top">
                    <span className="review-avatar" aria-hidden="true">
                      {review.avatar}
                    </span>
                    <div className="review-meta">
                      <figcaption className="review-author">{review.author}</figcaption>
                      <span className="review-source-tag">{review.source}</span>
                    </div>
                  </div>
                  <span className="review-stars" aria-label="Оценка 5 из 5">
                    ★★★★★
                  </span>
                  <blockquote>{review.text}</blockquote>
                </figure>
              ))}
            </div>

            <div className="reviews-cta-wrap">
              <a
                className="btn btn-accent"
                href={REVIEW_LINKS.yandex}
                target="_blank"
                rel="noopener noreferrer"
              >
                Все отзывы на Яндекс Картах
              </a>
              <a
                className="btn btn-accent"
                href={REVIEW_LINKS.gis}
                target="_blank"
                rel="noopener noreferrer"
              >
                Отзывы в 2ГИС
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="contacts section" id="contacts">
          <div className="container contacts-grid">
            <div className="contacts-info">
              <h2>Контакты и запись</h2>
              <p>
                <strong>Адрес:</strong> Екатеринбург, ул. Свердлова, 62
              </p>
              <p>
                <strong>Метро:</strong> Уральская
              </p>
              <p>
                <strong>Телефон:</strong>{" "}
                <a href={PHONE_HREF}>{PHONE}</a>
              </p>
              <div className="socials">
                <a href={SOCIAL.vk} target="_blank" rel="noopener noreferrer">
                  ВКонтакте
                </a>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </div>
              <a
                className="btn btn-accent"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Записаться онлайн
              </a>
            </div>
            <div className="map-wrap">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=60.604877%2C56.854817&z=17&pt=60.604877%2C56.854817%2Cpm2rdm&oid=97118654142&lang=ru_RU"
                title="Карта: Ça Va, Екатеринбург, ул. Свердлова 62"
                width="100%"
                height="360"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
