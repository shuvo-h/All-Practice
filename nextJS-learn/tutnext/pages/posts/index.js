import React from 'react';
import SinglePost from '../../components/SinglePost';

const PostList = ({posts}) => {
    return (
        <div>
            <h2>List of Posts: {posts.length} </h2>
            <div>
                {
                    posts.map((post,index) => <SinglePost post={post} key={index}></SinglePost>)
                }
            </div>
        </div>
    );
};

export default PostList;



export async function getStaticProps() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const allPosts = await response.json();
  return {
      props:{
          posts: allPosts
      }
  }
}
