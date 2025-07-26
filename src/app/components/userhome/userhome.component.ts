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
    this.httpClient.get<any[]>(baseUrl, { headers: headers }).subscribe(
      (response) => {
        this.Crates = response.map((crate) => {
          if (crate.crateImg && crate.crateImg.length > 0) {
            const byteArray = new Uint8Array(crate.crateImg);
            let binary = '';
            byteArray.forEach((byte) => (binary += String.fromCharCode(byte)));
            const base64 = btoa(binary);
            crate.crateImgSrc = `data:image/png;base64,${base64}`;
          }
          return crate;
        });
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
