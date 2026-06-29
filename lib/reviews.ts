import { REVIEWS, type Review } from "@/lib/site-data";
import fetched from "@/lib/reviews-fetched.json";

type FetchedPayload = {
  fetchedAt?: string;
  reviews?: Review[];
};

const payload = fetched as FetchedPayload;

export const REVIEWS_UPDATED_AT = payload.fetchedAt ?? null;

export const DISPLAY_REVIEWS: Review[] =
  payload.reviews && payload.reviews.length >= 6
    ? payload.reviews
    : REVIEWS;
