import React from 'react';
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
  return( 
  <div>
      {POSTS.map(post =>( 
          <Post key={post.id} username={post.username}
          userimg = {post.userimg}
          img={post.img}
          caption={post.caption}/>
      ))}
      {/* <Post/> */}
  </div>);
}

export default Posts;
