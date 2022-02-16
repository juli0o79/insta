//fragment must be imported because it is not an html element
import React, { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { Dialog, Transition } from "@headlessui/react"
import { CameraIcon } from '@heroicons/react/outline'


function Modal() {
  const [openModal, setOpenModal] = useRecoilState(modalState)
  //We Are using ref to interact with the hidden input
  const filePickerRef = useRef(null);
  const captionRef= useRef(null);
  const [selectedFile, setselectedfile] = useState(null);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    // checks if there is a selected file
    if (e.target.files[0]) {
      //If there is a file, read it as url
      reader.readAsDataURL(e.target.files[0])
    }
    //Once you read it, the load event will fire and store the file
    reader.onload = (readerEvent) => {
      setselectedfile(readerEvent.target.result)
    }
  }


  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as='div' className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setOpenModal(false)}>
        <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen
            pt-4 px-4 pb-28 text-center sm:block sm:p-0 '>
          <Transition.Child as={Fragment}
            enter='ease-out durantion-300'
            enterFrom='opacty-0'
            enterTo='opacity-100'
            leave='ease-in durantion-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          {/* This Element is to center modal contents */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden="true">

            &#8203;
          </span>
          <Transition.Child as={Fragment}
            enter="ease-out duration-300"
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm scale-100'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in durantion-200'
            leaveFrom='opacity-100 translate-y-0 sm:sclae-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg
                px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform
                transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
              <div>
                <div>
                  {selectedFile ? (<img src={selectedFile} onClick={()=> setselectedfile(null)} alt="uploaded Image" />) : (
                    <div
                      onClick={() => filePickerRef.current.click() /* using the div to trigger a click event on the input */}
                      className='mx-auto flex items-center justify-center h-12 w-12
                  rounded-full bg-red-100 cursor-pointer'>
                      <CameraIcon
                        className='h-6 w-6 text-red-600'
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title as='h3' className='text-lg leading-5 font-medium text-gray-900'>
                      Upload a Photo
                    </Dialog.Title>
                    <div>
                      <input
                        ref={filePickerRef}
                        type='file'
                        hidden
                        onChange={(e) => addImageToPost(e)}
                      />
                    </div>
                    <div className='mt-2'>
                      <input
                        className='border-none focus:ring-0 w-full text-center'
                        type='text'
                        placeholder='Placeholder and a little more' />
                        ref={captionRef}
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <button
                    type="button"
                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm
                    px-4 py-2 bg-red-600 text-base font-session text-white hover:bg-red-700 focus:outline-none
                    focus:ring-0 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled-gray-300
                    disabled:cursor-not-allowed hover:disabled:bg-gray-300
                    '
                  >
                    Upload Post
                  </button>
                </div>

              </div>

            </div>

          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal