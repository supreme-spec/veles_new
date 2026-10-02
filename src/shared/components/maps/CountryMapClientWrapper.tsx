'use client';

import React, { useState, useEffect } from 'react';
import { CountryMapIntegration } from './CountryMapIntegration';

interface CountryMapIntegrationProps {
  countryName: string;
  countryId: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  places?: Array<{
    name: string;
    lat: number;
    lng: number;
    type: 'city' | 'attraction' | 'resort' | 'airport';
    description?: string;
  }>;
  className?: string;
}

interface CountryMapClientWrapperProps extends CountryMapIntegrationProps {
  loadingFallback?: React.ReactNode;
}

export const CountryMapClientWrapper: React.FC<CountryMapClientWrapperProps> = ({
  loadingFallback = <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-4 lg:mt-6">Загрузка карты...</div>,
  ...props
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{loadingFallback}</>;
  }

  return <CountryMapIntegration {...props} />;
};