import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-appointment-book',
  standalone: true,
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class AppointmentBookComponent implements OnInit {
  doctorId!: number;
  date: string = this.formatDate(new Date());
  availableSlots: string[] = [];
  selectedSlot: string | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('QueryParams:', params);
      this.doctorId = +params['doctorId'];
      console.log('doctorId:', this.doctorId);

      if (!this.doctorId) {
        this.error = 'Доктор не указан.';
        return;
      }

      this.fetchSlots();
    });
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; 
  }

  fetchSlots() {
    this.loading = true;
    this.error = null;
    this.availableSlots = [];
    this.selectedSlot = null;
  
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Пользователь не авторизован.';
      this.loading = false;
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.http.get<string[]>(`http://localhost:5000/api/appointments/available/${this.doctorId}/${this.date}`, { headers }).subscribe({
      next: (slots) => {
        console.log('Slots from server:', slots);
        this.availableSlots = slots;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching slots:', err);
        this.error = 'Ошибка загрузки слотов';
        this.loading = false;
      }
    });
  }

  submitAppointment() {
    if (!this.selectedSlot) return;
  
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Пользователь не авторизован.';
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const appointmentDateTime = new Date(`${this.date}T${this.selectedSlot}:00`);
  
    this.http.post('http://localhost:5000/api/appointments', {
      doctorId: this.doctorId,
      appointment_date: appointmentDateTime.toISOString()
    }, { headers }).subscribe({
      next: () => {
        alert('Вы успешно записались на приём!');
        this.router.navigate(['/clinic']);
      },
      error: (err) => {
        this.error = err?.error?.error || 'Ошибка при записи';
      }
    });
  }
}
