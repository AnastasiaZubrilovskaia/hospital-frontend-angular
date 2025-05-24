import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Doctor } from "../models/doctor.model";
import { Review } from "../models/review.model";

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private API = 'http://localhost:5000/api/doctors';
  private SPECIALTIES_API = 'http://localhost:5000/api/specialties';
  private REVIEWS_API = 'http://localhost:5000/api/reviews';

  constructor(private http: HttpClient) {}

  // Получить всех докторов без кэширования
  getAll(): Observable<Doctor[]> {
    const params = new HttpParams().set('_', Date.now().toString());
    return this.http.get<Doctor[]>(this.API, { params });
  }

  // Получить докторов по специальности без кэширования
  getBySpecialty(specialty: string): Observable<Doctor[]> {
    const params = new HttpParams()
      .set('specialty', specialty)
      .set('_', Date.now().toString()); // для обхода кэша
    return this.http.get<Doctor[]>(this.API, { params });
  }

  // Получить список специальностей без кэширования
  getSpecialties(): Observable<{ name: string }[]> {
    const params = new HttpParams().set('_', Date.now().toString());
    return this.http.get<{ name: string }[]>(this.SPECIALTIES_API, { params });
  }

  // ✅ Получить отзывы для конкретного врача
  getReviews(doctorId: number): Observable<Review[]> {
    const params = new HttpParams().set('_', Date.now().toString());
    return this.http.get<Review[]>(`${this.REVIEWS_API}/doctor/${doctorId}`, { params });
  }
}
