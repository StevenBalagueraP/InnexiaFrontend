import { Component, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResult, SearchResultRoom } from '../../../core/interfaces/models/SearchResult';
import { Hotel } from '../../../core/interfaces/models/hotel-model';
import { RoomComponent } from '../room/room.component';
import { RoomSuggestion } from '../../../core/interfaces/models/RoomSuggestion';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SearchFilters } from '../../components/search-form/search-form.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule, RoomComponent, MatIconModule, MatButtonModule],
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.css',
})
export class HotelCard {
  private router = inject(Router);

  data = input.required<SearchResult | Hotel>();

  activeFilters = input<SearchFilters | null>(null);

  isSearchResult = computed(() => this.checkIsSearchResult(this.data()));

  hotelId = computed<string>(() => {
    const value = this.data();
    return this.checkIsSearchResult(value) ? value.hotelId : (value._id ?? '');
  });

  hotelName = computed<string>(() => {
    const value = this.data();
    return this.checkIsSearchResult(value) ? value.hotelName : value.name;
  });

  hotelImage = computed<string | null>(() => {
    const value = this.data();
    if (this.checkIsSearchResult(value)) {
      return value.image?.[0] ?? null;
    }
    return value.images?.[0] ?? null;
  });

  hotelLocation = computed<string>(() => {
    const value = this.data();
    return this.checkIsSearchResult(value) ? value.location : value.location;
  });

  hotelDescription = computed<string | null>(() => {
    const value = this.data();
    return this.checkIsSearchResult(value)
      ? (value.description ?? null)
      : (value.description ?? null);
  });

  totalPrice = computed<number | null>(() => {
    const value = this.data();
    return this.checkIsSearchResult(value) ? value.totalPrice : null;
  });

  optionLabel = computed<string | null>(() => {
    const value = this.data();
    return this.checkIsSearchResult(value) ? value.optionLabel : null;
  });

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

  navigateToBooking(): void {
    const filters = this.activeFilters();
    this.router.navigate(['hotel-booking', this.hotelId()], {
      state: { filters: filters ?? null }
    });
  }

  private checkIsSearchResult(data: SearchResult | Hotel): data is SearchResult {
    return 'hotelName' in data;
  }
}