export interface SearchResult {
  hotelId: string;
  hotelName: string;
  location: string;
  description?: string;
  amenities?: string[];
  available: boolean;
  image?: string[];
  optionLabel: string;
  rooms: SearchResultRoom[];
  totalPrice: number;
}

export interface SearchResultRoom {
  id: string;
  type: string;
  price: number;
  capacity: number;
}
