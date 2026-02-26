import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResult, SearchResultRoom } from '../../../core/interfaces/models/SearchResult';
import { Hotel } from '../../../core/interfaces/models/hotel-model';
import { RoomComponent } from '../room/room.component';
import { RoomSuggestion } from '../../../core/interfaces/models/RoomSuggestion';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule, RoomComponent, MatIconModule, RouterLink],
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.css',
})
export class HotelCard {

  data = input.required<SearchResult | Hotel>();

  isSearchResult = computed(() => this.checkIsSearchResult(this.data()));

  /** Hotel name — works for both types */
  hotelName = computed<string>(() => {
    const value = this.data();
    return this.checkIsSearchResult(value) ? value.hotelName : value.name;
  });

  /** First image or null */
  hotelImage = computed<string | null>(() => {
    const value = this.data();
    if (this.checkIsSearchResult(value)) {
      return value.image?.[0] ?? null;
    }
    return value.images?.[0] ?? null;
  });

  /** Location */
  hotelLocation = computed<string>(() => {
    const value = this.data();
    return this.checkIsSearchResult(value) ? value.location : value.location;
  });

  /** Description */
  hotelDescription = computed<string | null>(() => {
    const value = this.data();
    return this.checkIsSearchResult(value)
      ? (value.description ?? null)
      : (value.description ?? null);
  });

  /** Total price (only for SearchResult) */
  totalPrice = computed<number | null>(() => {
    const value = this.data();
    return this.checkIsSearchResult(value) ? value.totalPrice : null;
  });

  /** Option label (only for SearchResult) */
  optionLabel = computed<string | null>(() => {
    const value = this.data();
    return this.checkIsSearchResult(value) ? value.optionLabel : null;
  });

  /** Suggested rooms mapped to RoomSuggestion shape for app-room */
  suggestedRooms = computed<RoomSuggestion[]>(() => {
    const value = this.data();
    if (!this.checkIsSearchResult(value)) return [];
    return value.rooms.map((r: SearchResultRoom) => ({
      _id: r.id,
      type: r.type,
      price: r.price,
      capacity: r.capacity,
    }));
  });

  private checkIsSearchResult(data: SearchResult | Hotel): data is SearchResult {
    return 'hotelName' in data;
  }
}