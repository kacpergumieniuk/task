import { User } from '@/requests/requests';
import { Box } from '@mui/material';
import React from 'react';

interface SearchItemProps {
  user: User;
}

export const SearchItem = ({ user }: SearchItemProps) => {
  return (
    <Box className='w-full rounded bg-gray-300 py-4 h-[58px] items-center flex justify-between px-3 text-sm font-semibold'>
      <p>{user.login}</p>
      <img
        src={user.avatar_url}
        width={24}
        height={24}
        className='rounded-full'
      />
    </Box>
  );
};
