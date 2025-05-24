export interface Review {
    id?: number;
    userId: number;
    doctorId: number;
    comment: string;
    createdAt?: string;
  }