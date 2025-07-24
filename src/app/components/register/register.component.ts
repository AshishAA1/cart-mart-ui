import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  register = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private httpClient: HttpClient, private router: Router) {}

  public handleSubmitRegister() {
    if (this.register.invalid) {
      alert('Please correct the errors in the form!');
      this.register.markAllAsTouched(); // Show validation errors
      return;
    }
    console.log(this.register.value);
    this.httpClient
      .post('http://localhost:8085/auth/signup', this.register.value)
      .subscribe(
        (data: any) => {
          alert('Registration Successfully completed !!!!');
          this.router.navigate(['/login']);
        },
        (error) => {
          alert('Registration failed!');
        }
      );
  }
}
