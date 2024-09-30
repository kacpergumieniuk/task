import { Box } from '@mui/material';
import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <Box className='flex flex-col gap-2.5'>
      <Box className='h-[58px] bg-gray-300 animate-pulse rounded'></Box>
      <Box className='h-[58px] bg-gray-300 animate-pulse rounded'></Box>
      <Box className='h-[58px] bg-gray-300 animate-pulse rounded'></Box>
      <Box className='h-[58px] bg-gray-300 animate-pulse rounded'></Box>
      <Box className='h-[58px] bg-gray-300 animate-pulse rounded'></Box>
      <Box className='h-[58px] bg-gray-300 animate-pulse rounded'></Box>
    </Box>
  );
};
