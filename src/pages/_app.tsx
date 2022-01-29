import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { DarkThemeProvider } from '../contexts/DarkThemeContext'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <DarkThemeProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </DarkThemeProvider>
  )
}

export default MyApp
