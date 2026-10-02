// Utility for providing cruise photos from local archive

export interface CruisePhoto {
  url: string;
  description: string;
  photographer: string;
  location: string;
}

const CRUISE_PHOTOS: Record<string, CruisePhoto> = {
  mediterranean: {
    url: '/images/archive/cruises/mediterranean.jpg',
    description: 'Средиземноморский круиз по живописным побережьям',
    photographer: 'Велес Вояж Архив',
    location: 'Mediterranean Sea'
  },
  caribbean: {
    url: '/images/archive/cruises/caribbean.jpg',
    description: 'Карибский круиз среди тропических островов',
    photographer: 'Велес Вояж Архив',
    location: 'Caribbean Sea'
  },
  scandinavian: {
    url: '/images/archive/cruises/scandinavian.jpg',
    description: 'Скандинавский круиз среди фьордов и северных сияний',
    photographer: 'Велес Вояж Архив',
    location: 'Scandinavia'
  },
  asian: {
    url: '/images/archive/cruises/asian.jpg',
    description: 'Азиатский круиз по экзотическим портам и островам',
    photographer: 'Велес Вояж Архив',
    location: 'Asia'
  },
  alaska: {
    url: '/images/archive/cruises/alaska.jpg',
    description: 'Аляска круиз среди ледников и дикой природы',
    photographer: 'Велес Вояж Архив',
    location: 'Alaska'
  },
  world: {
    url: '/images/archive/cruises/world.jpg',
    description: 'Кругосветный круиз по самым красивым местам планеты',
    photographer: 'Велес Вояж Архив',
    location: 'Around the World'
  },
  default: {
    url: '/images/archive/cruises/default.jpg',
    description: 'Морской круиз по живописным маршрутам',
    photographer: 'Велес Вояж Архив',
    location: 'Ocean'
  }
};

// Return cruise photo directly from local archive
export async function fetchCruisePhoto(cruiseType?: string): Promise<CruisePhoto | null> {
  if (cruiseType && CRUISE_PHOTOS[cruiseType]) {
    return CRUISE_PHOTOS[cruiseType];
  }
  return CRUISE_PHOTOS.default;
}
