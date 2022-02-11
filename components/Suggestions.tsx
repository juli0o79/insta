import faker from '@faker-js/faker';
import React, { useEffect, useState } from 'react';


function Suggestions() {
    const [ suggestions, setSuggestions] = useState([]);
    const [state, setState] = useState([])
    
    useEffect(()=>{
        const suggestions = [...Array(5)].map((_, i)=>({
                ...faker.helpers.contextualCard(),
                id: i,
            }));
        setSuggestions(suggestions)
    },[]);
    
    
    // Usando o truque dos arrays para criar objetos
    useEffect(()=>{
      const arrayTest = [...Array(3)].map((_, i)=>({
        name: 'name'+i,
        id: i
      }));
      setState(arrayTest)
    },[])
   /*  const [suggestions, setSuggestions] = useState([{id:1, avatar:'', username:''}])
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
  },[]) */

  return(
    <div className='mt-4 ml-10 text[100px] mb-5'>
        <div className='flex justify-between mb-3'>
            <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
            <button className='text-gray-600 font-semibold'>See All</button>
        </div>
        {suggestions.map((profile)=>(
          <div key ={profile.id} className='flex
          items-center justify-between'>
            <img className='w-10 h-10 rounded-full border border-red-400 p-[2px]' src={profile.avatar} alt='profile-avatar' />
            <div className='flex-1 ml-4 mb-3'>
              <h2 className='font-semibold text-sm'>{profile.username}</h2>
              <h3 className='text-xs text-gray-400 truncate max-w-[120px]'>Works at {profile.company.name}</h3>
            </div>
            <button className='text[100px] font-semibold text-blue-400'>Follow</button>
          </div>
        ))}
    </div>
  );
}

export default Suggestions;
