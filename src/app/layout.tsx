import type { Metadata } from 'next'
import './globals.scss'

import { Header } from "./components/global/header/header.component"
import { ContentWrapper } from "./components/global/contentWrapper/contentWrapper.component"
import { Footer } from './components/global/footer/footer.component'

import "@fontsource/quicksand";
import "@fontsource/baloo-2";
import "@fontsource/baloo-2/800.css";

export const metadata: Metadata = {
  title: 'Vybe: Powered by Spotify',
  description: "Music's copilot"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

        <Header />

        <ContentWrapper>
          {children}
        </ContentWrapper>

        <Footer />
      </body>
    </html>
  )
}
