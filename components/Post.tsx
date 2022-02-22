import React, { useEffect, useState } from 'react';
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from '@heroicons/react/outline'

import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Moment from 'react-moment';

type postPropsType = {
    username: string;
    userimg: string;
    img: string;
    caption: string;
    id: string;
}

function Post({ username, userimg, img, caption, id }: postPropsType) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
            snapshot => setComments(snapshot.docs))
        return () => unsubscribe()
    }, [db, id])

    useEffect(()=>{
        const unsubscribe = onSnapshot(collection(db, 'posts', id, 'likes'),
        (snapshot)=>{
            setLikes(snapshot.docs)
        })
        return () => unsubscribe();
    },[db, id])

    useEffect(()=>{
        setHasLiked(likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1 )
    },[likes])
    const sendComment = async (e) => {
        // Prevent page refresh
        e.preventDefault();
        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp()
        })
    }

    const likePost = async()=>{
        if(hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uid.toString()))
        } else // we need wlese, otherwise the function will run both
        await setDoc(doc(db, 'posts', id, 'likes', session?.user?.uid.toString()),{
            username: session.user.username
        })
    }
    return (
        <div className='bg-white my-7 border rounded-sm'>
            {/* Header */}
            <div className='
      flex items-center p-5'>
                <img src={userimg} alt="post-image" className='rounded-full h-12 w-12 object-contain border p-1 mr-1' />
                {/* Estudar melhor essa parte de passar numero para o flex */}
                <p className='flex-1 font-bold'>{username}</p>
                <DotsHorizontalIcon className='h-5' />
            </div>

            {/* img */}
            <img src={img} alt='post-image' className='object-cover w-full' />

            {/* Buttons */}
            {session &&
                <div className='flex justify-between px-4 pt-4 pb-2'>
                    <div className='flex space-x-4'>
                        {
                            hasLiked ?  <HeartIconFilled className='btn text-red-500' onClick= {()=> likePost()}/> :
                            <HeartIcon onClick= {()=> likePost()} className='btn' />
                        }
                        
                        <ChatIcon className='btn' />
                        <PaperAirplaneIcon className='btn' />
                    </div>
                    <BookmarkIcon className='btn' />
                </div>}


            {/* caption */}
            {/*text-overlow é muito útil */}
            <p className='p-5 truncate'>
                {likes.length > 0 && <p className='font-bold mb-1'>{likes.length} likes</p>}
                <span className='font-bold mr-1'>{username}</span>{caption}
            </p>

            {/* comments */}
            {
                comments.length > 0 &&
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black
                scrollbar-thin'>
                    {comments.map(
                        comment =>
                            <div key={comment.id}
                                className='flex items-center space-x-2 mb-3'>
                                <img className='h-7 w-7 rounded-full' src={comment.data().userImage} alt="" />
                                <p className='text-sm flex-1'>
                                    <span className='font-bold mr-2'>{comment.data().username}</span>{comment.data().comment}
                                </p>
                                <Moment fromNow className='pr-5 text-xs'>
                                    {comment.data().timestamp?.toDate()}
                                </Moment>
                            </div>

                    )}
                </div>
            }

            {/* input box */}
            {session &&
                <form className='flex items-center p-4'>
                    <EmojiHappyIcon className='h-7' />
                    <input type='text'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className='border-none flex-1 focus:ring-0 outline-none'
                        placeholder='Add a comment...' />
                    <button
                        disabled={!comment.trim()}
                        onClick={(e) => sendComment(e)}
                        type='submit'
                        className='font-semibold text-blue-400'>
                        Post
                    </button>
                </form>
            }

        </div>
    );
}

export default Post;
