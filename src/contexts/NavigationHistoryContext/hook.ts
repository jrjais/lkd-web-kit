import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useContext } from "react";
import { NavigationHistoryContext } from ".";

export const QP_BACK_URL_NAME = 'backUrl';


interface NavigationHistoryHook {
  history: string[];
  goBack: (fallback?: string) => void;
  currentRoute: string | null;
  hasPreviousRoute: boolean;
  getPreviousRoute: () => string | null;
}


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
