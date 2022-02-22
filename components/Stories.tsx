import React, { useEffect, useState } from 'react'
import * as faker from '@faker-js/faker';
import Story from './Story';
import { useSession } from 'next-auth/react';

function Stories() {
  const [suggestions, setSuggestions] = useState([{ id: 1, avatar: '', username: '' }])
  useEffect(() => {
    // How to use fake Array [...Array(20)]
    // How to run a function multiple times
    const suggestions = [...Array(20)].map((_, i) => ({
      //o parênteses contornando o objeto é para que as chaves do objeto
      //não sejam confundidas com a abertura e fechamento de uma função
      ...faker.faker.helpers.contextualCard(),
      id: i
    })
    )
    setSuggestions(suggestions)
  }, [])
  const { data: session } = useSession();



  return (
    <div className='flex space-x-2 p-6 bg-white
    mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {suggestions.map(profile => (
        <Story key={profile.id} img={profile.avatar} username={profile.username} />
      ))}
    </div>
  )
}

export default Stories
