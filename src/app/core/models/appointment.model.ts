export interface Appointment {
  id?: number;
  patientId?: number;    
  doctorId: number;
  appointment_date: string; 
  status?: 'scheduled' | 'completed' | 'cancelled';
}
