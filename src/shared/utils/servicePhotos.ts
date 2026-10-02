// Utility for managing weekly changing photos for service cards
export interface ServicePhoto {
  url: string;
  description: string;
  photographer: string;
  location: string;
  week: number;
  year: number;
}

// Get current bi-weekly period (every 1-1.5 weeks)
export function getCurrentBiWeeklyPeriod(): { period: number; year: number } {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  // Calculate period as every 10 days (approximately 1.5 weeks)
  const period = Math.ceil(days / 10);

  return {
    period,
    year: now.getFullYear(),
  };
}

// Specific keywords for each cruise type to match descriptions
const cruiseTypeKeywords = {
  mediterranean: [
    'mediterranean sea cruise',
    'greek island cruise',
    'italian coast cruise',
    'ancient ruins cruise',
    'mediterranean yacht',
  ],
  caribbean: [
    'caribbean beach cruise',
    'tropical palm cruise',
    'caribbean island hopping',
    'white sand beach cruise',
    'caribbean vacation',
  ],
  scandinavian: [
    'scandinavian fjord cruise',
    'norway fjord ship',
    'northern lights cruise',
    'scandinavian nature cruise',
    'wilderness fjord',
  ],
  asian: [
    'asian cruise tour',
    'southeast asia cruise',
    'exotic island cruise',
    'asian culture cruise',
    'tropical asian waters',
  ],
  alaska: [
    'alaska cruise glacier',
    'iceberg cruise alaska',
    'wild alaska cruise',
    'alaska wildlife cruise',
    'northern cruise alaska',
  ],
  world: [
    'world cruise ship',
    'around the world cruise',
    'luxury world cruise',
    'global cruise tour',
    'international cruise',
  ],
};

// Predefined fallback photos from local archive
const fallbackPhotos = {
  tours: [
    {
      url: '/images/archive/services/tours-1.jpg',
      description: 'Путешественник в горах',
      photographer: 'Велес Вояж Архив',
      location: 'Альпы',
    },
    {
      url: '/images/archive/services/tours-2.jpg',
      description: 'Группа туристов',
      photographer: 'Велес Вояж Архив',
      location: 'Италия',
    },
  ],
  cruises: [
    {
      url: '/images/archive/services/cruises-1.jpg',
      description: 'Роскошный круизный лайнер',
      photographer: 'Велес Вояж Архив',
      location: 'Средиземное море',
    },
    {
      url: '/images/archive/services/cruises-2.jpg',
      description: 'Круизное судно в море',
      photographer: 'Велес Вояж Архив',
      location: 'Карибское море',
    },
    {
      url: '/images/archive/services/cruises-caribbean.jpg',
      description: 'Океанский лайнер',
      photographer: 'Велес Вояж Архив',
      location: 'Открытое море',
    },
    {
      url: '/images/archive/services/cruises-mediterranean.jpg',
      description: 'Круизный корабль',
      photographer: 'Велес Вояж Архив',
      location: 'Тропические воды',
    },
  ],
  support: [
    {
      url: '/images/archive/services/support.jpg',
      description: 'Круглосуточная поддержка путешественников 24/7',
      photographer: 'Велес Вояж Архив',
      location: 'Служба заботы о клиентах Велес Вояж',
    },
    {
      url: '/images/archive/services/flights-1.jpg',
      description: 'Планирование путешествия',
      photographer: 'Велес Вояж Архив',
      location: 'Офис турагентства',
    },
    {
      url: '/images/archive/services/hotels-1.jpg',
      description: 'Консультация по путешествиям',
      photographer: 'Велес Вояж Архив',
      location: 'Туристическое агентство',
    },
    {
      url: '/images/archive/services/insurance-1.jpg',
      description: 'Поддержка путешественников',
      photographer: 'Велес Вояж Архив',
      location: 'Служба поддержки',
    },
  ],
};

// Get photo for current bi-weekly period based on service type
export function getWeeklyServicePhoto(serviceType: 'tours' | 'cruises' | 'support'): ServicePhoto {
  const { period, year } = getCurrentBiWeeklyPeriod();

  // Use period number to select from fallback photos
  const photos = fallbackPhotos[serviceType];
  if (!photos || photos.length === 0) {
    throw new Error(`No fallback photos available for service type: ${serviceType}`);
  }

  const photoIndex = (period - 1) % photos.length;
  const selectedPhoto = photos[photoIndex];

  if (!selectedPhoto) {
    throw new Error(`Could not select photo for service type: ${serviceType}`);
  }

  return {
    ...selectedPhoto,
    week: period,
    year,
  };
}

// Fetch photo from our server API (which handles Unsplash requests server-side)
export async function fetchServicePhotoFromUnsplash(
  serviceType: 'tours' | 'cruises' | 'support',
  cruiseType?: keyof typeof cruiseTypeKeywords
): Promise<ServicePhoto | null> {
  try {
    const { period, year } = getCurrentBiWeeklyPeriod();

    // Use relative URL for client-side, absolute for server-side
    const url =
      typeof window !== 'undefined'
        ? `/api/service-photo?type=${serviceType}${cruiseType ? `&cruiseType=${cruiseType}` : ''}` // Relative URL on client
        : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9323'}/api/service-photo?type=${serviceType}${cruiseType ? `&cruiseType=${cruiseType}` : ''}`; // Absolute URL on server

    const response = await fetch(url);

    if (!response.ok) {
      // If API fails, return null to use fallback
      return null;
    }

    const data = await response.json();

    const photoObj = data.photo || data;
    const imageUrl = photoObj?.url;

    if (imageUrl && (imageUrl.startsWith('/') || imageUrl.startsWith('http'))) {
      return {
        url: imageUrl,
        description:
          photoObj.description ||
          photoObj.alt ||
          `Фото для ${serviceType === 'tours' ? 'туров' : serviceType === 'cruises' ? 'круизов' : 'поддержки'}`,
        photographer: photoObj.photographer || 'Велес Вояж Архив',
        location: photoObj.location || 'Архив',
        week: photoObj.week || period,
        year: photoObj.year || year,
      };
    }

    return null;
  } catch (error) {
    // Тихая обработка ошибок - используем fallback
    return null;
  }
}

// Check if Unsplash API key is valid (cache the result to avoid repeated 401 errors)
function isUnsplashKeyValid(): boolean {
  if (typeof window === 'undefined') return false;

  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  if (!accessKey || accessKey === 'demo' || accessKey === 'your_unsplash_access_key_here') {
    return false;
  }

  // Check cache for invalid key status (only if key hasn't changed)
  const invalidKeyCache = localStorage.getItem('unsplash-key-invalid');
  const cachedKey = localStorage.getItem('unsplash-key-value');

  // If key changed, clear invalid status
  if (cachedKey !== accessKey) {
    localStorage.removeItem('unsplash-key-invalid');
    localStorage.setItem('unsplash-key-value', accessKey);
    return true;
  }

  if (invalidKeyCache === 'true') {
    return false;
  }

  return true;
}

// Export function to clear invalid key cache (for manual reset)
export function clearUnsplashKeyCache(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('unsplash-key-invalid');
    localStorage.removeItem('unsplash-key-value');
    // Clear all cached photos to force refresh
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('service-photo-')) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Get cached photo or fetch new one for specific service
export async function getServicePhotoWithCache(
  serviceType: 'tours' | 'cruises' | 'support',
  cruiseType?: keyof typeof cruiseTypeKeywords
): Promise<ServicePhoto> {
  const { period, year } = getCurrentBiWeeklyPeriod();
  const cacheKey = `service-photo-${serviceType}-${cruiseType || 'general'}-${year}-${period}`;

  // Always serve high-quality photos from local archive
  const fallbackPhoto = getWeeklyServicePhoto(serviceType);

  if (typeof window !== 'undefined') {
    localStorage.setItem(cacheKey, JSON.stringify(fallbackPhoto));
  }

  return fallbackPhoto;
}
