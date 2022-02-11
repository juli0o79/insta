import React, { useEffect, useState } from 'react'
import * as faker from '@faker-js/faker';
import Story from './Story';

function Stories() {
  const [suggestions, setSuggestions] = useState([{id:1, avatar:'', username:''}])
  useEffect(()=>{
    // How to use fake Array [...Array(20)]
    // How to run a function multiple times
    const suggestions = [...Array(20)].map((_, i)=>({
      //o parênteses contornando o objeto é para que as chaves do objeto
      //não sejam confundidas com a abertura e fechamento de uma função
      ...faker.faker.helpers.contextualCard(),
      id: i
    })
    ) 
    //console.log('suggestion', suggestion)
    setSuggestions(suggestions)
  },[])

const objetoTotal = {
  valorUm: '1',
  valorDois: '2',
  valorTres: '3'
}
const arrayNumber = [1,2,3,4]

console.log('valores', ...arrayNumber)

  const someValues= [...Array(3)]


    
  return (
    <div className='flex space-x-2 p-6 bg-white
    mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
      {/* {[...Array(5)].map((_, i) =>(console.log('fui chamado' + i + 'vezes')))} */}
      {suggestions.map(profile=>(
        <Story key={profile.id} img={profile.avatar} username={profile.username}/>
      ))}
    </div>
  )
}

export default Stories
