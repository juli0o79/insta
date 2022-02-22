//fragment must be imported because it is not an html element
import React, { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { Dialog, Transition } from "@headlessui/react"
import { CameraIcon } from '@heroicons/react/outline'
import { db, storage } from '../firebase'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'

function Modal() {
  const [openModal, setOpenModal] = useRecoilState(modalState)
  //We Are using ref to interact with the hidden input
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setselectedfile] = useState(null);
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession();

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true)
    // create a post doc and add to the firestore 'posts' collection
    // get post id for the newly created post
    // upload image to the firebase storage with the post id
    // get a download URL from FB storage and update the original post with image
    // read this https://stackoverflow.com/questions/61784913/what-is-the-difference-between-firebase-storage-and-cloud-firestore-realtime-dat#:~:text=Since%20a%20Firestore%20document%20is,than%20just%20basic%20storage%20capabilities.

    //add doc lets us add a new document to a collection
    // we use collection helper function to get the collection. It receives the Firestore instance and the collection name
    const docRef = await addDoc(collection(db, 'posts'), {
      // The second argument of addDoc is the data to be added to the new document
      // the logged user wich will be uploading the information
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      //We can use ServerTimeStamp to get the updated time based on time-zone
      timestamp: serverTimestamp()
    })

    console.log('new doc added with id', docRef.id);
    //Here we upload the image to the firebase storage

    //create a ref inside firebase storage for the current image
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    // UploadString uploads the image to the Storage imageRef reference
    await uploadString(imageRef, selectedFile, "data_url") // it Returns a promise with the upload result
      .then(async snapshot => {
        // we can than get the url for the uploaded file and update the doc creates in firestore collection with the uploaded image
        const downloadURL = await getDownloadURL(imageRef);
        // we use The updateDoc helper function wich receives the doc function to get the doc and the content to update it
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL
        })
      });

    setOpenModal(false);
    setLoading(false);
    setselectedfile(null);

  }

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
                  {selectedFile ? (<img src={selectedFile} onClick={() => setselectedfile(null)} alt="uploaded Image" />) : (
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
                        placeholder='Placeholder and a little more'
                        ref={captionRef} />

                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <button
                    onClick={() => uploadPost()}
                    disabled={!selectedFile}

                    type="button"
                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm
                    px-4 py-2 bg-red-600 text-base font-session text-white hover:bg-red-700 focus:outline-none
                    focus:ring-0 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled-gray-300
                    disabled:cursor-not-allowed hover:disabled:bg-gray-300
                    '
                  >
                    {loading ? ' Uploading' : 'Upload Post'}
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