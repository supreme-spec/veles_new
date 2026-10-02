export interface Tour {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  duration: string;
  location: string;
  rating: number;
  features: string[];
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tours: Tour[];
}
