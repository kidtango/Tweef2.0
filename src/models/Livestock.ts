import { Member } from './Member';

export interface Livestock {
  id: string;
  name: string;
  price: Number;
  water: 'Saltwater' | 'Freshwater';
  class: 'Invertegrate' | 'Fish' | 'Coral' | 'Plant';
  coralType: 'SPS' | 'LPS' | 'Soft Coral' | 'NA';
  description: string;
  subcribers?: string[];
  location: string;
  seller: Member;
  likes: number | null;
  isLiked: Boolean | null;
  media: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Livestocks = Livestock[];
