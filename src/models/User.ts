import { Livestock } from './Livestock';

export interface User {
  id?: string;
  auth0_id?: string;
  kind: 'Reefer' | 'Planter' | 'FOWL';
  nick_name: string;
  family_name: string;
  name: string;
  rank: string;
  picture?: string;
  location: number;
  createdAt: Date;
  rating?: number;
  last_seen: Date;
  email: string;
  livestock?: [Livestock];
}
