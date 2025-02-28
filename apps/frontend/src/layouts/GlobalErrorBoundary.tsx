import {
  type ErrorResponse,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router';

export function GlobalErrorBoundary() {
  const error = useRouteError() as unknown as Error | ErrorResponse | null;

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1 style={{ color: 'red' }}>
          {error.status} {error.statusText}
        </h1>
        <h4>{`Error message: ${error.data}`}</h4>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1 style={{ color: 'red' }}>Error</h1>
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
