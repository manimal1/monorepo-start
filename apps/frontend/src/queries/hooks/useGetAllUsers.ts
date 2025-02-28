import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { User } from '@repo/aisist-api-client';
import { useAisistApiInstances } from '~/queries/hooks/useAisistApiInstances';
import { QueryKeysUsers } from '~/queries/variables/queryKeys';

export interface UsersQueryParams {
  // eslint-disable-next-line
  successCallback?: (data: User[]) => any;
  errorCallback?: (error: Error) => void;
  options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>;
}

export function useGetAllUsers({
  successCallback,
  errorCallback,
  options,
}: UsersQueryParams) {
  const { usersApi } = useAisistApiInstances();

  return useQuery({
    queryKey: [QueryKeysUsers.ALL_USERS],
    queryFn: () =>
      usersApi
        .apiUsersGet()
        .then((response) => {
          if (successCallback && response.data) {
            successCallback(response.data);
            return response.data;
          }

          return null;
        })
        .catch((error: Error) => {
          errorCallback?.(error);
          return null;
        }),
    ...options,
  });
}
