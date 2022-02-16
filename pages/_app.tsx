import React from 'react'
import { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react'

import '../styles/index.css'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps: {session, ...pageProps } }: AppProps) {
  return( 
    //Session provider tells the rendered component if there is an authenticated session
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>)
  
}

export default MyApp