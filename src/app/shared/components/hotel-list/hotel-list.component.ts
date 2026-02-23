import { Component, input } from '@angular/core';
import { SearchResult } from '../../../core/interfaces/models/SearchResult';
import { Hotel } from '../../../core/interfaces/models/hotel-model';
import { HotelCard } from '../hotel-card/hotel-card.component';

@Component({
    selector: 'app-hotel-list',
    standalone: true,
    imports: [HotelCard],
    templateUrl: './hotel-list.component.html',
    styleUrl: './hotel-list.component.css',
})
export class HotelListComponent {
    hotels = input<Hotel[]>([]);
    searchResults = input<SearchResult[]>([]);
}