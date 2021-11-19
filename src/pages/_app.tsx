import '@styles/globals.css'

import type { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <>
      <Head>
        <title>Аркада-вет</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export const API_HOST = process.env.NEXT_PUBLIC_API_HOST ?? 'http://localhost:8000'