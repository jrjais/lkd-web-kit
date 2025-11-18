'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { createContext, ReactNode, RefObject, Suspense, useEffect, useRef } from 'react';

interface NavigationHistoryContextType {
  history: string[];
}

export const NavigationHistoryContext = createContext<NavigationHistoryContextType | null>(null);

interface NavigationHistoryProviderProps {
  children: ReactNode;
}


export function NavigationHistoryProvider({ children }: NavigationHistoryProviderProps) {
  const historyRef = useRef<string[]>([]);

  return (
    <NavigationHistoryContext.Provider value={{ history: historyRef.current }}>
      <Suspense fallback={null}>
        <HistoryTracker historyRef={historyRef} />
      </Suspense>
      {children}
    </NavigationHistoryContext.Provider>
  );
}


interface HistoryTrackerProps {
  historyRef: RefObject<string[]>;
}

function HistoryTracker({ historyRef }: HistoryTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fullPath = searchParams?.size ? `${pathname}?${searchParams.toString()}` : pathname;

    if (fullPath) {
      const currentHistory = historyRef.current;
      // Evitar duplicados consecutivos
      if (currentHistory.length > 0 && currentHistory[currentHistory.length - 1] === fullPath) 
        return;
      
      historyRef.current = [...currentHistory, fullPath];
    }
  }, [pathname, searchParams, historyRef]);

  return null;
}