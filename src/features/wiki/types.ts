// Типы для wiki функциональности

export interface WikiPage {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  content: string;
  lastModified: string;
  creator?: string;
  tags?: string[];
  related?: string[];
  wikidataId?: string;
  dbpediaId?: string;
  mapCenter?: { lat: number; lng: number };
  mapZoom?: number;
  politicalStatus?: string;
}

export interface WikiCategory {
  id: string;
  name: string;
  description?: string;
  pages: string[]; // IDs of WikiPages
}

export interface WikiSearchResult {
  pageId: string;
  title: string;
  snippet: string;
  relevanceScore: number;
  tags?: string[];
}

export interface WikiState {
  pages: Record<string, WikiPage>;
  categories: Record<string, WikiCategory>;
  isLoading: boolean;
  error: string | null;
}
