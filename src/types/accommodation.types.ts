// types/accommodation.types.ts - New file for Accommodation types
export interface AccommodationSummary {
  id: string;
  name: string;
  accomTypeId: string;
  accomTypeName?: string | null;
  star: number;
  rating: number;
  address: string;
  location: string;
  coverImageId?: string | null;
  ggMapsQuery: string;
  ll: string;
  price: number;
  // Add more if backend returns them
}

export interface PagedResult<T> {
  items: T[];
  total: number;  
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AccomCreateDto {
  name: string;
  email: string;
  phone: string;
  accomTypeId: string;
  ggMapsQuery: string;
  ll: string;
  star: number;
  description: string;
  address: string;
  location: string;
  // Add other fields like description, etc.
}

export interface AccomUpdateDto {
  name: string;
  email: string;
  phone: string;
  accomTypeId: string;
  ggMapsQuery: string;
  ll: string;
  star: number;
  description: string;
  address: string;
  location: string;
  // Add other updatable fields
}

export interface AccomDetailDto extends AccommodationSummary {
  description?: string | null;  // Optional to match API (null possible)
  email: string;
  phone: string;
  createdAt: string;
  modifyAt?: string | null;
  updateBy?: string | null;
  generalInfo: GeneralInfo;
  policy: Policy;
  facilities: Facility[];
  images: Image[];
  roomCategories: RoomCategory[];
  reviews: Review[];
}

export interface Facility {
  id: string;
  name: string;
  icon: string;
  createdAt: string;
  modifyAt?: string | null;
  updateBy?: string | null;
}

export interface Image {
  id: string;
  url: string;
  alt: string;
  createdAt: string;
  modifyAt?: string | null;
  updateBy?: string | null;
}

export interface Room {
  id: string;
  name: string;
  available: boolean;
  breakfast: boolean;
  rating: number;
  price: number;
  categoryId: string;
  categoryName: string;
  bedTypeId: string;
  bedTypeName?: string | null;
}

export interface RoomCategory {
  id: string;
  name: string;
  basicFacilities: any[];  // Adjust if needed
  roomFacilities: any[];
  bathAmenities: any[];
  about: string;
  accomId: string;
  createdAt: string;
  modifyAt?: string | null;
  updateBy?: string | null;
  images: Image[];
  facilities: Facility[];
  rooms: Room[];
}

export interface GeneralInfo {
  accomId: string;
  popularFacility: string;
  checkOut: string;
  checkIn: string;
  distanceToDowntown: string;
  popularInArea: string;
  breakfastAvailability: boolean;
  availableRooms: number;
  numberOfFloors: number;
  anotherFacility: string;
  nearbyPOI: string;
}

export interface Policy {
  accomId: string;
  instruction?: string | null;
  requiredDocs?: string | null;
  checkIn: string;
  checkOut: string;
  breakfast: string;
  smoking: string;
  pets: string;
  additional?: string | null;
}

export interface Review {
  // Define if needed, empty for now
}

export interface GeneralInfoUpdateDto {
  popularFacility: string;
  checkOut: string;
  checkIn: string;
  distanceToDowntown: string;
  popularInArea: string;
  breakfastAvailability: boolean;
  availableRooms: number;
  numberOfFloors: number;
  anotherFacility: string;
  nearbyPOI: string;
}

export interface PolicyUpdateDto {
  instruction?: string | null;
  requiredDocs?: string | null;
  checkIn: string;
  checkOut: string;
  breakfast: string;
  smoking: string;
  pets: string;
  additional?: string | null;
}