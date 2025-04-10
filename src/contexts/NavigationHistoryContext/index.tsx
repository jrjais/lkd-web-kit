'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Defining types for the context value
interface NavigationHistoryContextType {
  history: string[];
}

// Creating the context with a proper type
const NavigationHistoryContext = createContext<NavigationHistoryContextType | null>(null);

// Props type for the provider component
interface NavigationHistoryProviderProps {
  children: ReactNode;
}

/**
 * Proveedor de historial de navegación
 * Solo se encarga de registrar las rutas visitadas
 */
export function NavigationHistoryProvider({ children }: NavigationHistoryProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Estado para almacenar el historial de navegación
  const [history, setHistory] = useState<string[]>([]);

  // Efecto para actualizar el historial cuando cambia la ruta o los parámetros
  useEffect(() => {
    // Creamos la URL completa (ruta + parámetros)
    const fullPath = searchParams?.size ? `${pathname}?${searchParams.toString()}` : pathname;

    if (fullPath) {
      setHistory((prev) => {
        // Evitar duplicados consecutivos
        if (prev.length > 0 && prev[prev.length - 1] === fullPath) {
          return prev;
        }
        return [...prev, fullPath];
      });
    }
  }, [pathname, searchParams]);

  return (
    <NavigationHistoryContext.Provider value={{ history }}>
      {children}
    </NavigationHistoryContext.Provider>
  );
}

// Return type for the useNavigationHistory hook
interface NavigationHistoryHook {
  history: string[];
  goBack: (fallback?: string) => void;
  currentRoute: string | null;
  hasPreviousRoute: boolean;
  getPreviousRoute: () => string | null;
}

export const QP_BACK_URL_NAME = 'backUrl';

/**
 * Hook para usar el historial de navegación
 * @returns {NavigationHistoryHook} Objeto con el historial y la función goBack
 */
export function useNavigationHistory(): NavigationHistoryHook {
  const context = useContext(NavigationHistoryContext);
  const router = useRouter();

  if (!context) {
    throw new Error('useNavigationHistory debe usarse dentro de un NavigationHistoryProvider');
  }

  const searchParams = useSearchParams();

  const { history } = context;

  /**
   * Navega hacia atrás en el historial o a la ruta de fallback
   * @param {string} fallback - Ruta a la que ir si no hay historial previo
   */
  const goBack = (fallback?: string) => {
    const returnUrl = searchParams.get(QP_BACK_URL_NAME);
    if (returnUrl) {
      router.push(returnUrl);
      return;
    }

    if (history.length <= 1) {
      router.push(fallback ?? '/');
      return;
    }

    // Obtener las dos últimas rutas
    const previousRoute = history[history.length - 2];
    const currentRoute = history[history.length - 1];

    // Si hay más de 2 rutas en el historial y detectamos un patrón de bucle
    if (history.length >= 3 && history[history.length - 3] === currentRoute) {
      // Ir a una ruta segura (home) o a la ruta de fallback
      router.push(fallback ?? '/');
      return;
    }

    // Navegación normal
    router.push(previousRoute ?? '/');
  };

  return {
    history,
    goBack,
    currentRoute: history.length > 0 ? history[history.length - 1] : null,
    hasPreviousRoute: history.length > 1,
    getPreviousRoute: () => (history.length >= 2 ? history[history.length - 2] : null),
  };
}
