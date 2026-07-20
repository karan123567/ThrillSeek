export interface Adventure {
    id: number;
    name: string;
    location: string;
    category: 'trekking' | 'water' | 'aerial' | 'winter' | 'wildlife';
    difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
    price: number;
    rating: number;
    reviews: number;
    image: string;
    duration: string;
    group: string;
    trending: boolean;
    topRated: boolean;
    budget: boolean;
    isNew: boolean;
    provider: string;
    description: string;
}

export interface Provider {
  name: string;
  location: string;
  adventures: number;
  rating: number;
  image: string;
  verified: boolean;
}

export interface Review {
  name: string;
  avatar: string;
  adventure: string;
  rating: number;
  text: string;
  date: string;
}

export type ToastType = 'success' | 'error' | 'info';
