export type Review = {
  authorName: string;
  rating: 5;
  reviewText: string;
  source: "Google";
  isFeatured: boolean;
  dateLabel?: string;
  projectType?: string;
  serviceContext?: string;
  isExcerpt?: boolean;
};

export const googleReviewSummary = {
  businessName: "Molonglo Construction Group",
  address: "13 Romano St, Denman Prospect ACT 2611, Australia",
  ratingValue: 5.0,
  reviewCount: 15
} as const;

export const reviews: Review[] = [
  {
    authorName: "Jatin Vohra",
    rating: 5,
    reviewText: "Great builders, excellent team!",
    source: "Google",
    isFeatured: false
  },
  {
    authorName: "Lydia #stylenstay",
    rating: 5,
    dateLabel: "a year ago",
    reviewText: "These guys have done our secondary dwelling at our property, we're very happy with the end product!",
    source: "Google",
    isFeatured: true,
    projectType: "Secondary dwelling"
  },
  {
    authorName: "Karanveer Singh Gill",
    rating: 5,
    dateLabel: "2 weeks ago",
    reviewText: "Highly recommend Molonglo Constructions. They are very professional, honest and hard working. Their quality truly speaks for itself, as they are probably one of the best around. I had an amazing experience working with Molonglo",
    source: "Google",
    isFeatured: false
  },
  {
    authorName: "Jibran Habib",
    rating: 5,
    dateLabel: "a month ago",
    reviewText: "TJ and Suhaan were very approachable and supportive to me and my family when faced with the daunting task of how to build a home.",
    source: "Google",
    isFeatured: false,
    serviceContext: "Home build",
    isExcerpt: true
  },
  {
    authorName: "Claudio Mastronardi",
    rating: 5,
    dateLabel: "Edited a month ago",
    reviewText: "Amazing local builder with exceptional build quality and attention to detail. Transparent and always happy to answer questions at any time.",
    source: "Google",
    isFeatured: true
  },
  {
    authorName: "sanjeev kumar",
    rating: 5,
    dateLabel: "a month ago",
    reviewText: "Had a great experience with Molonglo Construction as TJ always advised us to follow right guideline including selection of nice looking facade materials and other selections of interior stuff while our house was under construction. So, overall satisfactory results from Molonglo construction.",
    source: "Google",
    isFeatured: false,
    serviceContext: "Home construction"
  },
  {
    authorName: "Tony Rak",
    rating: 5,
    dateLabel: "a month ago",
    reviewText: "Building my dream home with Molonglo Constructions was a tremendous experience. TJ and his team were incredibly transparent about the process.",
    source: "Google",
    isFeatured: false,
    serviceContext: "Dream home",
    isExcerpt: true
  },
  {
    authorName: "Sachin Ahlawat",
    rating: 5,
    dateLabel: "a month ago",
    reviewText: "I would like to share that my experience with the TJ team has been very positive. They are extremely professional, and the quality of their work is outstanding.",
    source: "Google",
    isFeatured: false
  },
  {
    authorName: "Milan Vadher",
    rating: 5,
    dateLabel: "a month ago",
    reviewText: "Molonglo Constructions has provided a wonderful service, with excellent support and understanding throughout the entire build process. TJ and the team want the best for their clients and they most certainly deliver each and every time.",
    source: "Google",
    isFeatured: true,
    serviceContext: "Build process"
  },
  {
    authorName: "Kasra Zahedpur",
    rating: 5,
    dateLabel: "a month ago",
    reviewText: "Best builders in the ACT hands down",
    source: "Google",
    isFeatured: false
  },
  {
    authorName: "manjit singh Randhawa",
    rating: 5,
    dateLabel: "a month ago",
    reviewText: "Great boutique company where personalisation of your dreams doesn’t cost you arm and leg.",
    source: "Google",
    isFeatured: false
  },
  {
    authorName: "Rishi Sharma",
    rating: 5,
    dateLabel: "a month ago",
    reviewText: "Amazing service by the team at malongolo Construction Group highly recommend their services.",
    source: "Google",
    isFeatured: false
  },
  {
    authorName: "Manbir Randhawa",
    rating: 5,
    dateLabel: "a month ago",
    reviewText: "Molonglo Constructions stand out for their quality work and unique approach. With a flexible, reliable and friendly team and a clear focus on delivering great results. 100% would recommend to everyone!!",
    source: "Google",
    isFeatured: true
  },
  {
    authorName: "Aseem Bhatter",
    rating: 5,
    dateLabel: "a month ago",
    reviewText: "Great workmanship and excellent quality and attention to detail for smaller things.",
    source: "Google",
    isFeatured: false,
    isExcerpt: true
  },
  {
    authorName: "Aleesha Nafeez",
    rating: 5,
    dateLabel: "a month ago",
    reviewText: "Molonglo Constructions has unique building skills, and impressive architecture. I recommend everyone to give them a try!",
    source: "Google",
    isFeatured: false
  }
];

export const homepageReviews = reviews.filter((review) =>
  ["Claudio Mastronardi", "Milan Vadher", "Manbir Randhawa", "Lydia #stylenstay"].includes(review.authorName)
);
