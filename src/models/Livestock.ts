import { User } from './User';

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
  likes?: number | null;
  isLiked?: Boolean | null;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
  sellerId?: string;
}

export type Livestocks = Livestock[];
