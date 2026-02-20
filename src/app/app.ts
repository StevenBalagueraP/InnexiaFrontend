import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';
import { HotelCard } from './shared/components/hotel-card/hotel-card.component';
import { RoomComponent } from './shared/components/room/room.component';
import { Room } from './core/interfaces/models/room';
import { SearchResult } from './core/interfaces/models/SearchResult';
import { Hotel } from './core/interfaces/models/hotel-model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, SideMenuComponent, RoomComponent, HotelCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('innexiafrontend');
  testRoom: Room = {
    _id: '1',
    roomName: 'Deluxe Suite',
    capacity: 4,
    description: 'Habitación amplia con balcón y vista al mar.'
  };

  hotel: Hotel = {
    _id: 'h2',
    name: 'Mountain View Resort',
    location: 'Medellín',
    description: 'Descripción:  Lorem Ipsum -is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    amenities: ['Spa', 'WiFi', 'Gym'],
    images: ['https://images.pexels.com/photos/17836121/pexels-photo-17836121.jpeg']

  };

  testSearchResult: SearchResult = {
    hotel: {
      _id: 'h2',
      name: 'Mountain View Resort',
      location: 'Medellín, Colombia',
      description: 'Vista increíble a la montaña.',
      amenities: ['Spa', 'WiFi', 'Gym'],
      images: ['https://images.pexels.com/photos/17836121/pexels-photo-17836121.jpeg']
    },
    optionLabel: 'Best Option',
    suggestedRooms: [
      {
        _id: 'r1',
        type: 'Deluxe',
        price: 350000,
        capacity: 3
      },
      {
        _id: 'r2',
        type: 'Standard',
        price: 250000,
        capacity: 2
      }
    ],
    totalPrice: 600000,
    available: true
  };
}
