import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router';
import router from '~/routes/routes';
import { AuthProvider } from '~/providers/AuthProvider';
import { ThemeProvider } from '~/providers/ThemeProvider';
import '@fontsource/plus-jakarta-sans'; // Defaults to weight 400
import '@fontsource/plus-jakarta-sans/600.css'; // Specify weight
import '@fontsource/plus-jakarta-sans/400-italic.css';
import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      throwOnError: true,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default App;
