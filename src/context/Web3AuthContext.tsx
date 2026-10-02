'use client';

import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface Web3AuthContextType {
  // Add minimal required properties
  isConnected: boolean;
}

const Web3AuthContext = createContext<Web3AuthContextType | undefined>(undefined);

export function Web3AuthProvider({ children }: { children: ReactNode }) {
  // Provide minimal implementation
  const contextValue: Web3AuthContextType = {
    isConnected: false,
  };

  return (
    <Web3AuthContext.Provider value={contextValue}>
      {children}
    </Web3AuthContext.Provider>
  );
}

export function useWeb3Auth() {
  const context = useContext(Web3AuthContext);
  if (context === undefined) {
    throw new Error('useWeb3Auth must be used within a Web3AuthProvider');
  }
  return context;
}