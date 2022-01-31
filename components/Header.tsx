import Image from 'next/image'
import React, { useEffect } from 'react'
import {SearchIcon,
        PlusCircleIcon,
        HeartIcon,
        PaperAirplaneIcon,
        MenuIcon,
        UserGroupIcon
      } from '@heroicons/react/outline'
      import {HomeIcon} from '@heroicons/react/solid'

function Header() {
  useEffect(()=>{
    console.log('funcionando', 'funcionando')
  },[])
  return (
    <div className='shadow-sm border-b bg-white sticky top-0'>
      <div className='flex justify-between max-w-6xl mx-5 xl:mx-auto'>
        {/* Left */}
        <div className='relative h-24 w-24 hidden lg:inline-grid cursor-pointer'>
          <Image src='https://links.papareact.com/ocw'
          layout='fill'
          objectFit='contain'/>
        </div>
        <div className='relative w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer'>
          <Image src='https://links.papareact.com/jjm' 
          layout='fill'
          objectFit='contain'/>
        </div>
        {/* Middle - Search input Field*/}
        <div className='max-w-xs'>
            <div className='mt-1 relative p-3 rounded-md'>
            <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
              <SearchIcon  className='h-5 w-5 text-gray-500'/>
            </div>
            <input className='
            bg-gray-100
            block w-full
            pl-10
            sm:text-sm
            border-gray-300
            focus:ring-black
            focus:border-black
            rounded-md' type='text' placeholder='Search' />
          </div>
        </div>
        
        {/* Right */}
        <div className='flex items-center justify-end space-x-4'>
          <HomeIcon className='navBtn'/>
          <MenuIcon className='h-6 md:hidden cursor-pointer'/>
          <div className=' relative navBtn '>
            <PaperAirplaneIcon className='navBtn rotate-45'/>
            <div className=' bg-red-500 flex rounded-full
            items-center justify-center
            animate-pulse text-white absolute
            -top-1 -right-2 text-sm w-5 h-5'>3</div>
          </div>
          
          <PlusCircleIcon className='navBtn'/>
          <UserGroupIcon className='navBtn'/>
          <HeartIcon className='navBtn' />
          <img className='h-10 rouded-full cursor-pointer' src='https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png' alt='profile-pic' />
        </div>
      </div>
    </div>
  )
}

export default Header

