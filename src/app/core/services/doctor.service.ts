import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Doctor } from "../models/doctor.model";

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private API = 'http://localhost:5000/api/doctors';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.API);
  }
  getBySpecialty(specialty: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.API}?specialty=${encodeURIComponent(specialty)}`);
  }
  getSpecialties() {
    return this.http.get<{ name: string }[]>(`http://localhost:5000/api/specialties`);
  }
}
