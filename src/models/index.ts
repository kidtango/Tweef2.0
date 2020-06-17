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
