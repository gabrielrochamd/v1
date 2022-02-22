import '../styles/globals.scss'
import { getCookie } from 'cookies-next'
import App, { AppContext } from 'next/app'
import type { AppProps } from 'next/app'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { DarkThemeProvider } from '../contexts/DarkThemeContext'

type Props = AppProps & { darkTheme: boolean }

function MyApp({ Component, pageProps, darkTheme }: Props) {
  return (
    <DarkThemeProvider darkTheme={darkTheme}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </DarkThemeProvider>
  )
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context)
  const darkTheme = getCookie('darkTheme', { req: context.ctx.req })

  return {
    ...appProps,
    darkTheme: darkTheme === '1' ? true : false
  }
}

export default MyApp
