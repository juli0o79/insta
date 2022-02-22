import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import Post from './Post';

const POSTS=[
    {
        id:'123',
        username: 'user',
        userimg: 'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png',
        img: 'https://links.papareact.com/3ke',
        caption: 'This is dumb description'
    },
    {
        id:'456',
        username: 'user',
        userimg: 'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png',
        img: 'https://links.papareact.com/3ke',
        caption: 'This is dumb description'
    },
    {
        id:'789',
        username: 'user',
        userimg: 'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png',
        img: 'https://links.papareact.com/3ke',
        caption: 'This is dumb description'
    }
]

function Posts() {
    const [posts, setPosts] = useState([]);
    
    useEffect(()=>{
        //onsnapshot is used to keep track of the collection updates
       const unsubscribe =  onSnapshot(query(collection(db, 'posts'), orderBy('timestamp' , 'desc')), snapshot =>{
            setPosts(snapshot.docs)
        })
        // cleaning
        return ()=>{
            // Onsnapshot returns an unsubscribe function
            // we call it here so we won't create more than one listener
            unsubscribe();
        }
    }, [db])
    //console.log(posts)
    //console.log('data', posts[0].data())

  return( 
  <div>
      {posts.map(post =>( 
          <Post key={post.id}
          id={post.id}
          username={post.data().username}
          userimg = {post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}/>
      ))}
  </div>);
}

export default Posts;
