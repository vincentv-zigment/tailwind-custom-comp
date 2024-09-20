import React, { createContext, useContext } from 'react';
import dagre from 'dagre';

const DagreGraphContext = createContext<dagre.graphlib.Graph | null>(null);

export const useDagreGraph = () => {
  return useContext(DagreGraphContext);
};

export const DagreGraphProvider = DagreGraphContext.Provider;
