import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

const SinglePost = ({post}) => {
    const router = useRouter()
    const handleClick = () =>{
        router.push(`posts/${post.id}`);
        console.log(post);
        // router.replace('/');
    }
    return (
        <div>
            <h2>{post.id}) {post.title}</h2>
            <button onClick={handleClick}>details clickFn</button>
            <button><Link href={`posts/${post.id}`} passHref><p>Details LinkBtn</p></Link></button>
            <hr />
        </div>
    );
};

export default SinglePost;