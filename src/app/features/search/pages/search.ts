import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get('http://localhost:3000/hotels').subscribe(response => {
      console.log('Hotels Response:', response);
    });
  }
}
