import './layout.scss';
import './globals.css'
import Head from './head'
import QueryProviders from '@/provider/queryProvider';
import Script from 'next/script';
import Search from '@/components/search/Search';
import { Suspense } from 'react';
import Loading from '@/components/loading/Loading';

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
          <div className="page">
            <Suspense fallback={<Loading />}>
              <Search />
              {children}
            </Suspense>
          </div>
        </QueryProviders>
        <div id="modal" />
      </body>
    </html>
  )
}
