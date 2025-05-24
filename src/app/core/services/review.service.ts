import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Review } from '../models/review.model';



@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = `http://localhost:5000/api/reviews`;
  constructor(private http: HttpClient) {}
  getDoctorReviews(doctorId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }
  createReview(doctorId: number, data: { rating: number; comment: string }): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/doctor/${doctorId}`, data);
  }
  
}