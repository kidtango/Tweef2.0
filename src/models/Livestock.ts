import { User } from "./User";

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

interface Location {
  type: string;
  coordinates: number[];
  crs?: {
    type: string;
    properties: {
      name: string;
    };
  };
}

export interface Livestock {
  id?: string;
  name: string;
  price: number;
  class: "Invertegrate" | "Fish" | "Coral";
  coral_type: "SPS" | "LPS" | "Soft Coral" | "NA";
  description: string;
  zipcode?: number;
  user?: User;
  likes?: Like[];
  images: string[];
  created_at?: Date;
  updated_at?: Date;
  seller_id?: string;
  location?: Location;
  is_public: boolean;
}

export type Livestocks = Livestock[];
