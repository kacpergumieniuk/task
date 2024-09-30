import localFont from 'next/font/local';
import { Box, Container } from '@mui/material';
import { Main } from '@/components/Main';

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
    <Box
      className={`${geistSans.variable} ${geistMono.variable} h-screen font-[family-name:var(--font-geist-sans)] py-6`}
    >
      <Container maxWidth='md'>
        <Main />
      </Container>
    </Box>
  );
}
