import Image from 'next/image';
import localFont from 'next/font/local';
import { Container, TextField } from '@mui/material';

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

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} h-screen   font-[family-name:var(--font-geist-sans)] py-6`}
    >
      <Container maxWidth='md'>
        <TextField
          id='filled-basic'
          label='Search for user'
          variant='standard'
          className='w-full'
          color='primary'
        />
      </Container>
    </div>
  );
}
