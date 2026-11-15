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

export type StoredSearch = { at: number; photo: PixabayPhoto | null };
