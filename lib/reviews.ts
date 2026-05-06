export type Review = {
  author: string;
  rating: number;
  review: string;
  source: "Google";
  date?: string;
};

export const reviews: Review[] = [];
