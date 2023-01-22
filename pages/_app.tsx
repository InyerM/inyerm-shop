import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { SWRConfig } from "swr"
import { SnackbarProvider } from "notistack"

import { lightTheme } from "../themes"
import { UIProvider, CartProvider, AuthProvider } from "../context"
import "../styles/globals.css"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <SessionProvider>
        <PayPalScriptProvider
          options={{
            "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
          }}>
          <SWRConfig
            value={{
              fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
            }}>
            <UIProvider>
              <AuthProvider>
                <CartProvider>
                  <ThemeProvider theme={lightTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                  </ThemeProvider>
                </CartProvider>
              </AuthProvider>
            </UIProvider>
          </SWRConfig>
        </PayPalScriptProvider>
      </SessionProvider>
    </SnackbarProvider>
  )
}

