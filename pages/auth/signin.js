import { async } from '@firebase/util';
import { getProviders, signIn as signIntoProvider } from 'next-auth/react'
import React from 'react';
import Header from '../../components/Header'
//This is a root page, so the name should be lowercase
function signIn({ providers }) {
  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center py-2 mt-56 px-14 text-center'>
        <img className='w-80' src='https://links.papareact.com/ocw' alt='instagram logo' />
        <p className='font-xs italic'>This is a copy of instagram made for educational purposes</p>
        <div className='mt-40'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className='p-3 bg-blue-500 rounded-lg text-white'
                onClick={() => signIntoProvider(provider.id, { callbackUrl: '/' /* url ro redirect after sign in */ })}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
        {console.log('providers', providers)}
      </div>



    </>);
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers
    }
  }
}

export default signIn;
