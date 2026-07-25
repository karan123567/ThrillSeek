export interface Review {
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

export interface ReviewWithMeta {
  review: Review;
  adventureName: string;
  adventurePhoto?: string;
}