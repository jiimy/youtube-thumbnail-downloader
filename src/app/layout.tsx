import './layout.scss';
import './globals.css'
import Head from './head'
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
        {children}
        <div id="modal" />
      </body>
    </html>
  )
}
