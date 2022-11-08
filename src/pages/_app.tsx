import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import Layout from '@/components/Layout'
import customTheme from '@/theme'

const theme = extendTheme(customTheme)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </ChakraProvider>
  )
}
