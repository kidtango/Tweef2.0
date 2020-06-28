import { Member } from './Member';

export interface Livestock {
  id: string;
  name: string;
  water: 'SALTY' | 'FRESH';
  class: {
    type: 'INVERTEGRATES' | 'FISH';
    species: string;
  };
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
