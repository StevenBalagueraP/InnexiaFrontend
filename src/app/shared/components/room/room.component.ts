import { Component, input, output } from '@angular/core';
import { Room } from '../../../core/interfaces/models/room';
import { RoomSuggestion } from '../../../core/interfaces/models/RoomSuggestion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {

  room = input.required<RoomSuggestion>();

  variant = input<'search' | 'hotel-booking'>('search');

  selected = input<boolean>(false);

  bookClicked = output<void>();

}