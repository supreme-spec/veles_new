export interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  image?: string;
  location: string;
  startDate: Date;
  endDate: Date;
  maxParticipants: number;
  currentParticipants: number;
}
