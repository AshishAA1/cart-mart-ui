import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { response } from 'express';
import { Cookie } from 'ng2-cookies';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-userhome',
  imports: [CommonModule, HttpClientModule, HeaderComponent],
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
  standalone: true,
})
export class UserhomeComponent implements OnInit {
  public Crates: any = [];

  constructor(private httpClient: HttpClient) {}

  getAllUsers() {
    const baseUrl = 'http://localhost:8085/api/crates/getCrates';
    const token = Cookie.get('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    Cookie.set('authToken', token);
    this.httpClient.get(baseUrl, { headers: headers }).subscribe(
      (response: any) => {
        this.Crates = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  ngOnInit(): void {
    this.getAllUsers();
  }
}
