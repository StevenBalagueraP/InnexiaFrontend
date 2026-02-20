import { Component } from '@angular/core';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class Room {

  roomName: string = 'Room Name';
  capacity: number = 2;
  description: string =
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
}