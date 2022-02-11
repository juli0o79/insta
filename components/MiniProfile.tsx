import React, { useEffect, useState } from 'react';
import {signOut, useSession} from 'next-auth/react'

function MiniProfile() {
  const { data: session } = useSession();
  const [user, setUser] = useState('')
  useEffect(()=>{setUser(session?.user?.username)},[session])
  return(
  <div className='flex items-center justify-between mt-14 ml-10'>
     <div className='flex items-center w-full'>
         <img className='rounded-full border p-[2px]
        w-16 h-16' src={/* Session is assync, so it ccan be undefined */session?.user?.image} alt="user-profile-img"/>
        <div className='flex-1 mx-4'>
          {console.log('loaded session', session)}
            <h2 className='font-bold'>{user ? user : 'No user logged'}</h2>
            <h3 className='text-sm text-gray-400'>User Bio</h3>
        </div>
        
    </div>
    <button onClick={()=> signOut()}
    className='text-blue-400 text-sm font-semibold w-20'>Sign Out</button>
  </div>);
}

export default MiniProfile;
