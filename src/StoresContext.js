import React from 'react';
import {
  CollectionStore
} from './stores';
// Import stores here.

const store = {
  collectionStore: new CollectionStore(),
};

const StoresContext = React.createContext(store);

export default StoresContext;

// Also write provider for older components
export const StoreProvider = ({children}) => {
  return (
    <StoresContext.Provider value={store}>{children}</StoresContext.Provider>
  );
};
