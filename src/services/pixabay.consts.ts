export const PIXABAY_API_URL = "https://pixabay.com/api/";
/** Fixed search parameters: photos only, filtered for all ages, the fewest hits allowed. */
export const PIXABAY_SEARCH = { image_type: "photo", safesearch: "true", per_page: "3" };
export const PIXABAY_QUERY_MAX_LENGTH = 100;
/** Pixabay's terms require caching each request for 24 hours. */
export const PIXABAY_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
export const PIXABAY_STORAGE_PREFIX = "neus-ui:pixabay:";
/** Languages the search accepts through its `lang` parameter. */
export const PIXABAY_LANGUAGES: readonly string[] = [
  "cs", "da", "de", "en", "es", "fr", "id", "it", "hu", "nl", "no", "pl", "pt",
  "ro", "sk", "fi", "sv", "tr", "vi", "th", "bg", "ru", "el", "ja", "ko", "zh",
];
