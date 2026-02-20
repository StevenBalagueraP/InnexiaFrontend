import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResult } from '../../../core/interfaces/models/SearchResult';
import { Hotel } from '../../../core/interfaces/models/hotel-model';
import { RoomComponent } from '../room/room.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule, RoomComponent, MatIconModule],
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.css',
})
export class HotelCard {

  // 🔥 Angular 21 signal input (required)
  data = input.required<SearchResult | Hotel>();

  // 🔥 Computed signals
  hotel = computed<Hotel>(() => {
    const value = this.data();
    return this.isSearchResult(value) ? value.hotel : value;
  });

  totalPrice = computed<number | null>(() => {
    const value = this.data();
    return this.isSearchResult(value) ? value.totalPrice : null;
  });

  suggestedRooms = computed(() => {
    const value = this.data();
    return this.isSearchResult(value) ? value.suggestedRooms : [];
  });

  private isSearchResult(data: any): data is SearchResult {
    return 'hotel' in data;
  }
}