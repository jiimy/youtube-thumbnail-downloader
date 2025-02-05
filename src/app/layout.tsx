import './layout.scss';
import './globals.css'
import Head from './head'
import QueryProviders from '@/provider/queryProvider';
import Script from 'next/script';

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="ko">
      <Head />
      <body>
        <QueryProviders>
          {children}
        </QueryProviders>
        <div id="modal" />
      </body>
    </html>
  )
}
