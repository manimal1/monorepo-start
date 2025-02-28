import { Configuration, UsersApi } from '@repo/aisist-api-client';

const { VITE_AISIST_API_URL } = import.meta.env;

export const useAisistApiInstances = () => {
  const configuration = new Configuration({
    basePath: VITE_AISIST_API_URL,
  });

  const usersApi = new UsersApi(configuration);

  return { usersApi };
};
