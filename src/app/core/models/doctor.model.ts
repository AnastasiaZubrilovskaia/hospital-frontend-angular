export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: number;
  education: string;
  specialtyId: number;
  Specialty: {
    name: string;
  };
}
