"use client";
import { createContext, useContext } from "react";

const PageData = createContext<any | undefined>(undefined);

interface PageDataProviderProps {
  children: React.ReactNode;
  value: any;
}

export const PageDataProvider = ({
  value,
  children
}: PageDataProviderProps) => (
  <PageData.Provider value={value}>{children}</PageData.Provider>
);
export const usePageData = <T,>(): T => {
  const data = useContext(PageData);
  if (data === undefined) throw new Error("Out of context: usePageData");

  return data;
};
