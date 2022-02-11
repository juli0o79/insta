import React from 'react'
import { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react'

import '../styles/index.css'

function MyApp({ Component, pageProps: {session, ...pageProps } }: AppProps) {
  return( 
    //Session provider tells the rendered component if there is an authenticated session
    <SessionProvider session={session}>
      <Component {...pageProps} />)
    </SessionProvider>)
  
}

export default MyApp