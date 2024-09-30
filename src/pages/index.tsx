import { useState, useEffect } from 'react';
import localFont from 'next/font/local';
import { Box, Container, TextField } from '@mui/material';
import { SearchItem } from '@/components/SearchItem';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';
import { useForm } from 'react-hook-form';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { User, UsersRes, fetchGitHubUsers } from '@/requests/requests';
import InfiniteScroll from 'react-infinite-scroll-component';

//Uzyteczne techniki programowania funkcyjnego w kodzie:

// Zastosowanie hooków do zarządzania stanem oraz efektami, co pozwala na bardziej deklaratywne podejście
// Użycie debouncingu w celu optymalizacji wywołań API przy wyszukiwaniu użytkowników
// Aktualizacja stanu użytkowników przy użyciu funkcji, co pozwala na łatwiejsze łączenie wyników

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

interface FormInputs {
  username: string;
}

export default function Home() {
  const [username, setUsername] = useState<string>('');
  const [debouncedUsername] = useDebounce<string>(username, 2000);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [users, setUsers] = useState<User[]>([]);
  const { register } = useForm<FormInputs>();

  const preventAction = username.length < 1;

  const { data, error, isLoading } = useQuery<UsersRes, Error>(
    ['githubUsers', debouncedUsername, page],
    () => fetchGitHubUsers(debouncedUsername, page),
    {
      enabled: !!debouncedUsername && !preventAction && page > 0,
      onSuccess: (newData) => {
        setUsers((prevUsers) => [...prevUsers, ...newData.items]);
      },
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setIsDebouncing(true);
  };

  useEffect(() => {
    if (username) {
      const timer = setTimeout(() => {
        setIsDebouncing(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setUsers([]);
      setPage(1);
    }
  }, [username]);

  const loading = isLoading || isDebouncing;
  const areUsersDisplayed = !isDebouncing && !error;
  const noUsersFound = username.length >= 1 && users.length < 1 && !loading;

  return (
    <Box
      className={`${geistSans.variable} ${geistMono.variable} h-screen font-[family-name:var(--font-geist-sans)] py-6`}
    >
      <Container maxWidth='md'>
        <form>
          <Box className='mb-8'>
            <TextField
              id='github-username'
              label='GitHub Username'
              variant='outlined'
              className='w-full'
              color='primary'
              {...register('username')}
              onChange={handleInputChange}
            />
          </Box>
        </form>

        {loading && !preventAction && <LoadingSkeleton />}
        {preventAction && (
          <p className='text-center'>
            Provide a value to search for the users.
          </p>
        )}
        {error && <p className='text-center'>{error.message}</p>}
        {noUsersFound && <p className='text-center'>No users found</p>}
        {areUsersDisplayed && (
          <InfiniteScroll
            dataLength={users.length}
            next={() => setPage((prevPage) => prevPage + 1)}
            hasMore={users.length < (data?.total_count || 0)}
            loader={<LoadingSkeleton />}
          >
            <Box className='flex flex-col gap-2.5'>
              {users.map((user: User) => (
                <SearchItem key={user.login} user={user} />
              ))}
            </Box>
          </InfiniteScroll>
        )}
      </Container>
    </Box>
  );
}
