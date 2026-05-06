export type Review = {
  author: string;
  rating: number;
  review: string;
  source: "Google";
  date?: string;
};

// TODO: Replace this manual list with verified Google review data when a live reviews source or approved exports are available.
export const reviews: Review[] = [];
