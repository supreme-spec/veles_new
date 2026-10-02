export interface PlaceData {
    name: string;
    lat: number;
    lng: number;
    type: 'city' | 'attraction' | 'resort' | 'airport';
    description?: string;
}

export interface PlaceWithCountry extends PlaceData {
    countryId: string;
    countryName: string;
}
