import { Component, input } from '@angular/core';
import { Room } from '../../../core/interfaces/models/room';
import { RoomSuggestion } from '../../../core/interfaces/models/RoomSuggestion';

@Component({
  selector: 'app-room',
  standalone: true,
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {

  room = input.required<RoomSuggestion>();

}