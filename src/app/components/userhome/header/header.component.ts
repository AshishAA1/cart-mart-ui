import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private httpClient: HttpClient, private router: Router) {}
  public logout() {
    Cookie.delete('authToken');

    this.httpClient
      .post('http://localhost:8085/logout', {}, { withCredentials: true })
      .subscribe({
        next: (data: any) => {
          alert('Logout successful!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          alert('Logout failed!');
        },
        complete: () => {
          console.log('Logout request complete.');
        },
      });
  }
}
