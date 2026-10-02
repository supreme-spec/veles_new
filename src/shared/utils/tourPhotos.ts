// Utility for providing tour photos from local archive

export interface TourPhoto {
  url: string;
  description: string;
  photographer: string;
  location: string;
  week?: number;
  year?: number;
}

const TOUR_PHOTOS: Record<string, TourPhoto> = {
  europe: {
    url: '/images/archive/tours/europe.jpg',
    description: 'Европейские туры и экскурсионные маршруты',
    photographer: 'Велес Вояж Архив',
    location: 'Европа'
  },
  asia: {
    url: '/images/archive/tours/asia.jpg',
    description: 'Азиатские приключения и экзотика',
    photographer: 'Велес Вояж Архив',
    location: 'Азия'
  },
  africa: {
    url: '/images/archive/tours/africa.jpg',
    description: 'Африканские сафари и природные парки',
    photographer: 'Велес Вояж Архив',
    location: 'Африка'
  },
  america: {
    url: '/images/archive/tours/america.jpg',
    description: 'Американские маршруты и национальные парки',
    photographer: 'Велес Вояж Архив',
    location: 'Америка'
  },
  cruise: {
    url: '/images/archive/tours/cruise.jpg',
    description: 'Океанские и морские круизы',
    photographer: 'Велес Вояж Архив',
    location: 'Океан'
  },
  extreme: {
    url: '/images/archive/tours/extreme.jpg',
    description: 'Экстремальные и приключенческие туры',
    photographer: 'Велес Вояж Архив',
    location: 'Мир'
  },
  oceania: {
    url: '/images/archive/tours/oceania.jpg',
    description: 'Туры в Океанию и на тропические острова',
    photographer: 'Велес Вояж Архив',
    location: 'Океания'
  },
  'south-america': {
    url: '/images/archive/tours/south-america.jpg',
    description: 'Туры в Южную Америку',
    photographer: 'Велес Вояж Архив',
    location: 'Южная Америка'
  },
  turkey: {
    url: '/images/archive/tours/turkey.jpg',
    description: 'Туры в Турцию — курорты и отели всё включено',
    photographer: 'Велес Вояж Архив',
    location: 'Турция'
  },
  egypt: {
    url: '/images/archive/tours/egypt.jpg',
    description: 'Туры в Египет — Красное море и пирамиды',
    photographer: 'Велес Вояж Архив',
    location: 'Египет'
  },
  uae: {
    url: '/images/archive/tours/uae.jpg',
    description: 'Туры в ОАЭ — Дубай и отдых на заливе',
    photographer: 'Велес Вояж Архив',
    location: 'ОАЭ'
  },
  thailand: {
    url: '/images/archive/tours/thailand.jpg',
    description: 'Туры в Таиланд — пляжи Пхукета и Самуи',
    photographer: 'Велес Вояж Архив',
    location: 'Таиланд'
  }
};

// Return tour photo directly from local archive
export async function fetchTourPhoto(tourType: string): Promise<TourPhoto | null> {
  const photo = TOUR_PHOTOS[tourType.toLowerCase()] || TOUR_PHOTOS.europe;
  return photo;
}

// Return all tour photos directly
export async function fetchAllTourPhotos(): Promise<Record<string, TourPhoto>> {
  return TOUR_PHOTOS;
}
