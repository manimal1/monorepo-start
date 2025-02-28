import { createBrowserRouter } from 'react-router';
import { GlobalErrorBoundary } from '~/layouts/GlobalErrorBoundary';
import { HydrateFallback } from '~/layouts/HydrateFallback';
import ProtectedRoute from '~/routes/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    lazy: async () => {
      const { LoginRoute } = await import('~/features/auth/LoginRoute');
      return { Component: LoginRoute };
    },
  },
  {
    path: '/',
    lazy: async () => {
      const { Layout } = await import('~/layouts/Layout');
      return { Component: Layout };
    },
    hydrateFallbackElement: <HydrateFallback />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute />, // Protect all routes inside here
        children: [
          {
            path: '/',
            lazy: async () => {
              const { HomeRoute } = await import('~/features/home/HomeRoute');
              return { Component: HomeRoute };
            },
            hydrateFallbackElement: <HydrateFallback />,
          },
          {
            path: '/chat',
            lazy: async () => {
              const { ChatRoute } = await import('~/features/chat/ChatRoute');
              return { Component: ChatRoute };
            },
            hydrateFallbackElement: <HydrateFallback />,
          },
        ],
      },
    ],
  },
]);

export default router;
