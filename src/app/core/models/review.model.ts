export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  status?: string;  
  Patient?: {
    firstName: string;
    lastName: string;
  };
}
