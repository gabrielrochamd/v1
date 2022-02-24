import '../styles/globals.scss'
import { getCookie } from 'cookies-next'
import type { AppProps } from 'next/app'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { DarkThemeProvider } from '../contexts/DarkThemeContext'

function MyApp({ Component, pageProps }: AppProps) {
  const darkThemeCookie = getCookie('darkTheme', { secure: true })
  const darkTheme = darkThemeCookie === '1' ? true : false
  
  return (
    <DarkThemeProvider darkTheme={darkTheme}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </DarkThemeProvider>
  )
}

export default MyApp
