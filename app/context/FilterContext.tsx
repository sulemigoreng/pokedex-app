"use client";

import { createContext, ReactNode, useContext, useState } from 'react';

type filterContext = {
  filter: string[],
  changeFilter: (newFilter: string[]) => void,
}

const filterContextDefault: filterContext = {
  filter: [],
  changeFilter: () => { },
}

const FilterContext = createContext<filterContext>(filterContextDefault);

export function FilterProvider({ children }: {children : ReactNode}) {
  const [filter, setFilter] = useState<string[]>([]);
  const changeFilter = (newFilter: string[]) => {
    setFilter(newFilter);
  };


  return (
    <FilterContext.Provider value={{ filter, changeFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}