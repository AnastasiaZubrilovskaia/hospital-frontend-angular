import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appointment } from "../models/appointment.model";

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private API = 'http://localhost:5000/api/appointments';
  constructor(private http: HttpClient) {}
  create(appointment: Appointment): Observable<any> {
    return this.http.post(this.API, appointment);
  }
  getUserAppointments(userId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.API}/user/${userId}`);
  }
}