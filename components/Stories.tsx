import React, { useEffect } from 'react'
import * as faker from '@faker-js/faker';

function Stories() {
  useEffect(()=>{
    // How to use fake Array [...Array(20)]
    // How to run a function multiple times
    const suggestion = [...Array(20)].map((_, i)=>({
      ...faker.faker.helpers.contextualCard(),
      id: i
    })
    ) 
    console.log('suggestion', suggestion)
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
    <div>
      {[...Array(5)].map((_, i) =>(console.log('fui chamado' + i + 'vezes')))}
    </div>
  )
}

export default Stories
