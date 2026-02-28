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

  /**
   * Visual variant:
   * - 'search': compact card used inside search results (default)
   * - 'hotel-booking': expanded card used inside hotel booking flow
   */
  variant = input<'search' | 'hotel-booking'>('search');

  /** Whether this room is currently selected by the user */
  selected = input<boolean>(false);

  /** Emitted when the user clicks the Book button inside this card */
  bookClicked = output<void>();

}