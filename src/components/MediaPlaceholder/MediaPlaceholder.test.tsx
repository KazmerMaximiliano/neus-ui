import { composeStories } from "@storybook/react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import type { MediaPlaceholderProps } from "../../index";
import { MediaPlaceholder } from "../../index";
import type { PixabayPhoto } from "../../services/pixabay";
import { searchPixabayPhoto } from "../../services/pixabay";
import * as stories from "./MediaPlaceholder.stories";

vi.mock("../../services/pixabay", () => ({ searchPixabayPhoto: vi.fn() }));

const { MediaPlaceholder: MediaPlaceholderStory } = composeStories(stories);
const photo = { src: "https://cdn.pixabay.com/photo/vet_640.jpg", credit: "Ana" };
const search = vi.mocked(searchPixabayPhoto);
const deferred = () => {
  let resolve!: (value: PixabayPhoto | null) => void;
  const promise = new Promise<PixabayPhoto | null>((done) => (resolve = done));
  return { promise, resolve };
};

beforeEach(() => {
  search.mockReset().mockResolvedValue(photo);
});

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("lang");
});

describe("MediaPlaceholder", () => {
  it("renders an image role named by its label, with the label visible once", () => {
    render(<MediaPlaceholder label="Team portrait" />);
    const frame = screen.getByRole("img", { name: "Team portrait" });
    expect(frame).toHaveClass("media-placeholder");
    expect(frame.style.getPropertyValue("--media-placeholder-ratio")).toBe("4 / 3");
    const label = frame.querySelector(".media-placeholder__label")!;
    expect(label).toHaveTextContent("Team portrait");
    expect(label).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards ratio, native attributes, classes, styles and refs to their parts", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <MediaPlaceholder ref={ref} label="Map" ratio="16 / 9" id="map" className="frame" style={{ maxWidth: 320 }}
        labelClassName="caption" labelStyle={{ color: "red" }} />,
    );
    const frame = screen.getByRole("img", { name: "Map" });
    expect(ref.current).toBe(frame);
    expect(frame).toHaveAttribute("id", "map");
    expect(frame).toHaveClass("media-placeholder", "frame");
    expect(frame.style.getPropertyValue("--media-placeholder-ratio")).toBe("16 / 9");
    expect(frame).toHaveStyle({ maxWidth: "320px" });
    expect(frame.firstElementChild).toHaveClass("media-placeholder__label", "caption");
    expect(frame.firstElementChild).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("renders its story without searching", () => {
    render(<MediaPlaceholderStory />);
    expect(screen.getByRole("img", { name: /Vet examining a dog/ })).toBeInTheDocument();
    expect(search).not.toHaveBeenCalled();
  });

  it("requires a label and takes no children", () => {
    expectTypeOf<MediaPlaceholderProps>().toHaveProperty("label");
    // @ts-expect-error the label is what the picture will show
    void (<MediaPlaceholder />);
    // @ts-expect-error the frame has no children
    void (<MediaPlaceholder label="x">child</MediaPlaceholder>);
  });

  describe("photo preview", () => {
    it("does not search without a key", () => {
      const { container } = render(<MediaPlaceholder label="Team portrait" pixabayKey="" />);
      expect(search).not.toHaveBeenCalled();
      expect(container.querySelector("img")).toBeNull();
    });

    it("searches by the label, the ratio and the page language", async () => {
      document.documentElement.lang = "es-AR";
      render(<MediaPlaceholder label="Perro en la clínica" ratio="3 / 4" pixabayKey="key" />);
      await act(async () => {});
      expect(search).toHaveBeenCalledWith({ key: "key", query: "Perro en la clínica", ratio: "3 / 4", lang: "es-AR" });
    });

    it("searches by the query and the frame's own language, which stays on the frame", async () => {
      document.documentElement.lang = "es";
      render(<MediaPlaceholder label="Vet examining a dog" query="vet dog" lang="en" pixabayKey="key" />);
      await act(async () => {});
      expect(search).toHaveBeenCalledWith({ key: "key", query: "vet dog", ratio: "4 / 3", lang: "en" });
      expect(screen.getByRole("img", { name: "Vet examining a dog" })).toHaveAttribute("lang", "en");
    });

    it("keeps the placeholder until the photo loads, then shows it with its credit", async () => {
      const { container } = render(<MediaPlaceholder label="Vet examining a dog" pixabayKey="key" />);
      await act(async () => {});
      const image = container.querySelector("img")!;
      expect(image).toHaveAttribute("src", photo.src);
      expect(image).toHaveAttribute("alt", "");
      expect(image).toHaveClass("media-placeholder__image");
      expect(image).toHaveAttribute("data-loaded", "false");
      expect(container.querySelector(".media-placeholder__credit")).toBeNull();
      fireEvent.load(image);
      expect(image).toHaveAttribute("data-loaded", "true");
      const credit = container.querySelector(".media-placeholder__credit")!;
      expect(credit).toHaveTextContent("Pixabay · Ana");
      expect(credit).toHaveAttribute("aria-hidden", "true");
      expect(screen.getAllByRole("img")).toHaveLength(1);
      expect(screen.getByRole("img", { name: "Vet examining a dog" })).toContainElement(image);
    });

    it("keeps the placeholder when nothing is found, the search fails or the photo does not load", async () => {
      search.mockResolvedValueOnce(null).mockRejectedValueOnce(new Error("429"));
      const { container } = render(
        <>
          <MediaPlaceholder label="Nothing" pixabayKey="key" />
          <MediaPlaceholder label="Failure" pixabayKey="key" />
          <MediaPlaceholder label="Broken" pixabayKey="key" />
        </>,
      );
      await act(async () => {});
      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(1);
      fireEvent.error(images[0]);
      expect(images[0]).toHaveAttribute("data-loaded", "false");
      expect(container.querySelector(".media-placeholder__credit")).toBeNull();
    });

    it("ignores a search that settles after the props changed or the frame unmounted", async () => {
      const stale = deferred();
      search.mockReturnValueOnce(stale.promise).mockResolvedValueOnce(null);
      const { container, rerender, unmount } = render(<MediaPlaceholder label="Dog" pixabayKey="key" />);
      rerender(<MediaPlaceholder label="Cat" pixabayKey="key" />);
      await act(async () => stale.resolve(photo));
      expect(container.querySelector("img")).toBeNull();

      const late = deferred();
      search.mockReturnValueOnce(late.promise);
      rerender(<MediaPlaceholder label="Bird" pixabayKey="key" />);
      unmount();
      await act(async () => late.resolve(photo));
      expect(search).toHaveBeenCalledTimes(3);
    });

    it("drops the previous photo when the search changes", async () => {
      search.mockResolvedValueOnce(photo).mockReturnValueOnce(deferred().promise);
      const { container, rerender } = render(<MediaPlaceholder label="Dog" pixabayKey="key" />);
      await act(async () => {});
      expect(container.querySelector("img")).not.toBeNull();
      rerender(<MediaPlaceholder label="Cat" pixabayKey="key" />);
      expect(container.querySelector("img")).toBeNull();
    });

    it("forwards classes and styles to the photo and its credit", async () => {
      const { container } = render(
        <MediaPlaceholder label="Dog" pixabayKey="key" imageClassName="photo" imageStyle={{ objectPosition: "top" }}
          creditClassName="author" creditStyle={{ color: "red" }} />,
      );
      await act(async () => {});
      const image = container.querySelector("img")!;
      expect(image).toHaveClass("media-placeholder__image", "photo");
      expect(image).toHaveStyle({ objectPosition: "top" });
      fireEvent.load(image);
      const credit = container.querySelector(".media-placeholder__credit");
      expect(credit).toHaveClass("media-placeholder__credit", "author");
      expect(credit).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });
  });
});
