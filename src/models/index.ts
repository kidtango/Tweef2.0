export interface Contact {
  id: string;
  name: string;
  avatar: string;
  isActive?: boolean;
  lastActivity: number;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: string;
  createdAt: number;
}

export interface Member {
  id: string;
  kind: 'Reefer' | 'Planter' | 'FOWL';
  firstName: string;
  lastName: string;
  avatar?: string;
  location: string;
  createdAt: Date;
  rating?: number;
}

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
  likes?: number;
  isLiked?: Boolean;
  media: string;
  createdAt: Date;
  updatedAt: Date;
}
