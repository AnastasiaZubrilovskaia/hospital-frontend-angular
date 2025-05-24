export interface Patient {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  birthDate: string,
  role:  'user' | 'admin';
  }
  