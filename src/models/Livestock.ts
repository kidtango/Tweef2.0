import { Member } from './Member';

export interface Livestock {
  id?: string;
  name: string;
  price: Number;
  water: 'Saltwater' | 'Freshwater';
  class: 'Invertegrate' | 'Fish' | 'Coral' | 'Plant';
  coralType: 'SPS' | 'LPS' | 'Soft Coral' | 'NA';
  description: string;
  location: number;
  member?: Member;
  likes?: number | null;
  isLiked?: Boolean | null;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
  sellerId?: string;
}

export type Livestocks = Livestock[];
