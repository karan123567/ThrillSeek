import { ReactNode } from "react";

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
  avatar: any;
  name: ReactNode;
  date: ReactNode;
  id: string;
  adventureId: number;
  userId: string;
  userName: string;
  userPhoto: string;
  userVerified: boolean;
  adventureName: string;
  rating: number;
  title: string;
  text: string;
  photos: string[];
  helpfulCount: number;
  reportCount: number;
  status: "published" | "flagged" | "removed";
  createdAt: { seconds: number };
  updatedAt?: { seconds: number };
}

export interface ScheduleSlot {
  date: string;
  time: string;
  capacity: number;
  booked: number;
}

export interface ProviderListing {
  id: string;
  providerId: string;
  name: string;
  category: 'trekking' | 'water' | 'aerial' | 'winter' | 'wildlife';
  difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
  location: string;
  duration: string;
  groupSize: number;
  price: number;
  currency: string;
  description: string;
  inclusions: string;
  exclusions: string;
  requirements: string;
  cancellationPolicy: string;
  status: 'draft' | 'published' | 'paused' | 'archived';
  gallery: string[];
  schedule: ScheduleSlot[];
}

export type ToastType = 'success' | 'error' | 'info';
