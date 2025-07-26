import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  data = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private httpClient: HttpClient, private router: Router) {}

  public handleSubmit() {
    if (this.data.invalid) {
      alert('Please fill all required fields correctly.');
      this.data.markAllAsTouched(); // Trigger validation error messages
      return;
    }
    console.log(this.data.value);
    this.httpClient
      .post('http://localhost:8085/auth/login', this.data.value)
      .subscribe(
        (data: any) => {
          console.log(data);
          Cookie.delete('authToken');
          Cookie.set('authToken', data.token);
          if (data && data.token) {
            alert('login successfully');
            this.router.navigate(['/userhome']);
          } else {
            alert('something went wrong , password or email incorrect !!!');
          }
        },
        (error) => {
          alert('Login failed. Please try again later.');
        }
      );
  }
}
