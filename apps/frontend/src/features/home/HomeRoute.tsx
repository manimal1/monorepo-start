import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { User } from '@repo/aisist-api-client';
import { useGetAllUsers } from '~/queries/hooks/useGetAllUsers';

export function HomeRoute() {
  const [users, setUsers] = useState<Array<User>>([]);

  const { isLoading: isUsersLoading } = useGetAllUsers({
    successCallback: setUsers,
    errorCallback: (error) =>
      enqueueSnackbar(error?.message, { variant: 'error' }),
  });

  console.log({ users, isUsersLoading }); // eslint-disable-line

  return <div>Home</div>;
}
