import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appointment } from "../models/appointment.model";

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private baseUrl = 'http://localhost:5000/api/appointments';
  constructor(private http: HttpClient) {}

  // Получить доступные слоты у доктора на дату
  getAvailableSlots(doctorId: number, date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/available/${doctorId}/${date}`);
  }

  // Создать запись
  createAppointment(appointment: { doctorId: number; appointment_date: string }): Observable<Appointment> {
    return this.http.post<Appointment>(this.baseUrl, appointment);
  }

  // Получить записи пациента
  getPatientAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl);
  }

  // Отмена записи
  cancelAppointment(id: number): Observable<Appointment> {
    return this.http.delete<Appointment>(`${this.baseUrl}/${id}`);
  }
}