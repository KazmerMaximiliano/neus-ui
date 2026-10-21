import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from "vitest";
import type { PixabayPhotoSearch } from "./pixabay";

const hits = { hits: [{ webformatURL: "https://cdn.pixabay.com/photo/dog_640.jpg", user: "Ana" }] };
const answer = (body: object, status = 200) =>
  ({ ok: status < 400, status, json: () => Promise.resolve(body) }) as Response;
// A fresh module is a page reload: the in-memory searches are gone, the storage stays.
const load = async () => (await import("./pixabay")).searchPixabayPhoto;
const dog: PixabayPhotoSearch = { key: "secret key", query: "vet dog", ratio: "4 / 3" };
const requested = (fetch: MockInstance<typeof globalThis.fetch>, call = 0) =>
  new URL(String(fetch.mock.calls[call][0])).searchParams;

let fetch: MockInstance<typeof globalThis.fetch>;

beforeEach(() => {
  vi.resetModules();
  localStorage.clear();
  fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(answer(hits));
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("searchPixabayPhoto", () => {
  it("asks for one safe photo matching the query and returns it with its author", async () => {
    const search = await load();
    await expect(search(dog)).resolves.toEqual({ src: "https://cdn.pixabay.com/photo/dog_640.jpg", credit: "Ana" });
    expect(String(fetch.mock.calls[0][0])).toMatch(/^https:\/\/pixabay\.com\/api\/\?/);
    expect(Object.fromEntries(requested(fetch))).toEqual({
      key: "secret key",
      q: "vet dog",
      image_type: "photo",
      safesearch: "true",
      per_page: "3",
      orientation: "horizontal",
    });
  });

  it("picks the orientation from the ratio", async () => {
    const search = await load();
    const orientation = async (ratio: string) => {
      fetch.mockClear();
      await search({ ...dog, query: `dog ${ratio}`, ratio });
      return requested(fetch).get("orientation");
    };
    expect(await orientation("16 / 9")).toBe("horizontal");
    expect(await orientation("3/4")).toBe("vertical");
    expect(await orientation("2")).toBe("horizontal");
    expect(await orientation("1 / 1")).toBeNull();
    expect(await orientation("auto")).toBeNull();
  });

  it("sends a supported primary language and leaves out the rest", async () => {
    const search = await load();
    await search({ ...dog, lang: "es-AR" });
    await search({ ...dog, query: "dog", lang: "xx" });
    await search({ ...dog, query: "cat", lang: "" });
    expect(requested(fetch, 0).get("lang")).toBe("es");
    expect(requested(fetch, 1).has("lang")).toBe(false);
    expect(requested(fetch, 2).has("lang")).toBe(false);
  });

  it("trims the query to Pixabay's 100 characters and never sends an empty one", async () => {
    const search = await load();
    await search({ ...dog, query: ` ${"a".repeat(120)} ` });
    expect(requested(fetch).get("q")).toHaveLength(100);
    await expect(search({ ...dog, query: "   " })).resolves.toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("returns null when nothing matches and caches that answer", async () => {
    fetch.mockResolvedValue(answer({ hits: [] }));
    const search = await load();
    await expect(search(dog)).resolves.toBeNull();
    await expect((await load())(dog)).resolves.toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("shares a pending search and keeps answers for 24 hours across reloads, without the key", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    const search = await load();
    await Promise.all([search(dog), search({ ...dog, key: "other" })]);
    expect(fetch).toHaveBeenCalledTimes(1);
    const stored = Object.entries(localStorage);
    expect(stored).toHaveLength(1);
    expect(JSON.stringify(stored)).not.toContain("secret");

    vi.resetModules();
    vi.advanceTimersByTime(23 * 60 * 60 * 1000);
    await expect((await load())(dog)).resolves.toMatchObject({ credit: "Ana" });
    expect(fetch).toHaveBeenCalledTimes(1);

    vi.resetModules();
    vi.advanceTimersByTime(2 * 60 * 60 * 1000);
    await (await load())(dog);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("does not cache failures", async () => {
    fetch.mockResolvedValueOnce(answer({}, 429)).mockRejectedValueOnce(new TypeError("offline"));
    const search = await load();
    await expect(search(dog)).rejects.toThrow("status 429");
    await expect(search(dog)).rejects.toThrow("offline");
    await expect(search(dog)).resolves.toMatchObject({ credit: "Ana" });
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it("still searches when the storage is unavailable", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("denied");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("full");
    });
    const search = await load();
    await expect(search(dog)).resolves.toMatchObject({ credit: "Ana" });
  });
});
