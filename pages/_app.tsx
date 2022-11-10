import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SWRConfig } from 'swr'
import { SnackbarProvider } from 'notistack'

import { lightTheme } from '../themes'
import { UIProvider, CartProvider } from '../context'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <UIProvider>
          <CartProvider>
            <ThemeProvider theme={ lightTheme }>
              <CssBaseline />
              <Component { ...pageProps } />
            </ThemeProvider>
          </CartProvider>
        </UIProvider>
      </SWRConfig>
    </SnackbarProvider>
  )
}
