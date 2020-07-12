import { User } from './User';

export interface Like {
  id: string;
  user: {
    auth0_id: string;
  };
  livestock: {
    id: string;
  };
  livestock_id: string;
}

export interface CreateLike {
  livestock_id: string;
}

export interface Livestock {
  id?: string;
  name: string;
  price: Number;
  water: 'Saltwater' | 'Freshwater';
  class: 'Invertegrate' | 'Fish' | 'Coral' | 'Plant';
  coral_type: 'SPS' | 'LPS' | 'Soft Coral' | 'NA';
  description: string;
  location: number;
  user?: User;
  likes?: Like[];
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
  sellerId?: string;
}

export type Livestocks = Livestock[];
