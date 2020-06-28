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
