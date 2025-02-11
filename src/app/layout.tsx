import './layout.scss';
import './globals.css'
import Head from './head'
import QueryProviders from '@/provider/queryProvider';
import Script from 'next/script';
import Search from '@/components/search/Search';

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
            <Search />
            {children}
          </div>
        </QueryProviders>
        <div id="modal" />
      </body>
    </html>
  )
}
