import {
  PIXABAY_API_URL,
  PIXABAY_CACHE_TTL_MS,
  PIXABAY_LANGUAGES,
  PIXABAY_QUERY_MAX_LENGTH,
  PIXABAY_SEARCH,
  PIXABAY_STORAGE_PREFIX,
} from "./pixabay.consts";

/** A stock photo found for a query and the name of the person who published it. */
export type PixabayPhoto = { src: string; credit: string };

export type PixabayPhotoSearch = {
  key: string;
  query: string;
  /** CSS aspect ratio of the frame, which picks the photo's orientation. */
  ratio: string;
  /** BCP 47 language of the query; ignored when Pixabay does not support it. */
  lang?: string;
};

type StoredSearch = { at: number; photo: PixabayPhoto | null };

// ponytail: settled searches stay in memory while the tab lives and expired storage entries are
// never pruned; both are a few bytes per query, add a sweep if a page ever searches hundreds.
const searches = new Map<string, Promise<PixabayPhoto | null>>();

const readStored = (id: string) => {
  try {
    const entry = JSON.parse(localStorage.getItem(PIXABAY_STORAGE_PREFIX + id) ?? "null") as StoredSearch | null;
    return entry && Date.now() - entry.at < PIXABAY_CACHE_TTL_MS ? entry : undefined;
  } catch {
    return undefined;
  }
};

const store = (id: string, photo: PixabayPhoto | null) => {
  try {
    localStorage.setItem(PIXABAY_STORAGE_PREFIX + id, JSON.stringify({ at: Date.now(), photo }));
  } catch {
    // Storage full or disabled: the in-memory search still serves this tab.
  }
};

/**
 * Finds the first safe photo for a query, or null when there is none. Searches are shared while
 * pending and cached for 24 hours, as Pixabay's terms require; the cache never holds the key.
 */
export const searchPixabayPhoto = ({ key, query, ratio, lang }: PixabayPhotoSearch): Promise<PixabayPhoto | null> => {
  const q = query.trim().slice(0, PIXABAY_QUERY_MAX_LENGTH);
  // An empty query would return Pixabay's general feed.
  if (!q) return Promise.resolve(null);
  const params = new URLSearchParams({ q, ...PIXABAY_SEARCH });
  const [width, height = 1] = ratio.split("/").map(Number);
  if (width > 0 && height > 0 && width !== height) {
    params.set("orientation", width > height ? "horizontal" : "vertical");
  }
  const language = lang?.split("-")[0].toLowerCase();
  if (language && PIXABAY_LANGUAGES.includes(language)) params.set("lang", language);
  const id = params.toString();
  const pending = searches.get(id);
  if (pending) return pending;
  const stored = readStored(id);
  const search = stored
    ? Promise.resolve(stored.photo)
    : fetch(`${PIXABAY_API_URL}?key=${encodeURIComponent(key)}&${id}`).then(async (response) => {
      if (!response.ok) throw new Error(`Pixabay search failed with status ${response.status}`);
      const { hits } = (await response.json()) as { hits?: { webformatURL: string; user: string }[] };
      const photo = hits?.[0] ? { src: hits[0].webformatURL, credit: hits[0].user } : null;
      // A search without hits is an answer too; failures are not cached.
      store(id, photo);
      return photo;
    });
  searches.set(id, search);
  search.catch(() => searches.delete(id));
  return search;
};
