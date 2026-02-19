import { Hotel } from "./hotel-model";
import { RoomSuggestion } from "./RoomSuggestion";

export interface SearchResult {
  hotel: Hotel;
  optionLabel: string;
  suggestedRooms: RoomSuggestion[];
  totalPrice: number;
  available: boolean;
}
