import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf, NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
  imports: [ NgIf, NgFor, DatePipe]
})
export class MyAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.loading = true;

    this.http.get<any[]>('http://localhost:5000/api/appointments', { headers }).subscribe({
      next: (data) => {
        console.log('Полученные записи:', data);
        this.appointments = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Ошибка загрузки записей';
        this.loading = false;
      }
    });
  }

  cancelAppointment(id: number): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.delete(`http://localhost:5000/api/appointments/${id}`, { headers }).subscribe({
      next: () => {
        this.appointments = this.appointments.filter(a => a.id !== id);
      },
      error: () => {
        this.error = 'Ошибка при отмене записи';
      }
    });
  }
}
