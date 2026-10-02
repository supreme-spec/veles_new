export interface TouristTripPlace {
  name: string;
  description?: string;
  latitude?: number | string;
  longitude?: number | string;
}

export interface TouristTripSeason {
  name: string;
  validThrough?: string;
  weatherConsideration?: string;
}

export interface TouristTrip4DOptions {
  name: string;
  description?: string;
  url?: string;
  place?: TouristTripPlace;
  season?: TouristTripSeason;
}

export function buildTouristTrip4D(options: TouristTrip4DOptions) {
  const {
    name,
    description,
    url,
    place,
    season,
  } = options;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    ...(description ? { description } : {}),
    ...(url ? { url } : {}),
  };

  if (place) {
    const placeSchema: Record<string, unknown> = {
      '@type': 'Place',
      name: place.name,
      ...(place.description ? { description: place.description } : {}),
    };

    if (typeof place.latitude === 'number' || typeof place.longitude === 'number') {
      placeSchema.geo = {
        '@type': 'GeoCoordinates',
        ...(typeof place.latitude === 'number' ? { latitude: place.latitude } : {}),
        ...(typeof place.longitude === 'number' ? { longitude: place.longitude } : {}),
      };
    }

    schema.spatialCoverage = placeSchema;
  }

  if (season) {
    schema.seasonal = season.name;
    if (season.validThrough) {
      schema.validThrough = season.validThrough;
    }
    if (season.weatherConsideration) {
      schema.weatherConsideration = season.weatherConsideration;
    }
  }

  return schema;
}
