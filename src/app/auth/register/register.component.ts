import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  phone = '';
  birthDate = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister() {
    this.errorMessage = '';
    
    const formattedDate = this.birthDate ? new Date(this.birthDate).toISOString().split('T')[0] : '';
    
    const registerData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      birthDate: formattedDate
    };

    console.log('Sending registration data:', JSON.stringify(registerData, null, 2));

    this.authService.register(registerData).subscribe({
      next: () => {
      },
      error: (error) => {
        console.log('Full error response:', JSON.stringify(error, null, 2));
        console.log('Error details:', JSON.stringify(error.error, null, 2));
        
        if (error.error && error.error.errors) {
          const errorMessages = error.error.errors.map((err: any) => {
            console.log('Individual error:', JSON.stringify(err, null, 2));
            return err.msg || err.message || JSON.stringify(err);
          });
          this.errorMessage = errorMessages.join(', ');
          console.log('Validation errors:', JSON.stringify(error.error.errors, null, 2));
        } else {
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
      }
    });
  }
}