import React from 'react';
import {useRouter} from 'next/router';


const PostDetails = ({singlePost}) => {
    const {isFallback} = useRouter();
    if (isFallback) {
        return <div><h2>Loading.......</h2></div>
    }
    return (
        <div>
            <h1>Details of {singlePost.id} No. Post</h1>
            <h2>{singlePost.title}</h2>
            <div>
                {singlePost.body}
            </div>
        </div>
    );
};

export default PostDetails;

export async function getStaticPaths(){  // getStaticPaths() function is required to confirm the dynamic routing, to tell the static page that what will be the dynamic value for the route
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const allPosts = await response.json();
    const pathsByPostID = allPosts.map(post=>{  // making a array of postId sothat this array can be used as the dynamically static path 
        return {params: {postid: `${post.id}`}}
    })
    return {
        paths: pathsByPostID,
        // fallback: false, // true/false/blocking  //false: render 404 page if path is not included in this "getStaticPaths()" returned array // true: don't show 404 page. but generate a new page for the requested new unknown dynamic path value
        fallback: true, // keep it true, so that if static page is not found, it will create a new page at that time by fetching the database again, will show the Loader... during gengerating the new page
    }
    /*
    // make it dynamic
    return {
        paths: [                         // this "path" key determine which path will be statically generated during build the production package
            {params: {postid: `1`}},     // inform nextJS to generate the dynamic param value of "postid" will be `${singlePost.id}
            {params: {postid: `2`}},
            {params: {postid: `3`}},
        ],
        fallback: true,
    }
    */
}

export async function getStaticProps({params}){  // reacive a object namely context={params:{postid}}  /// postid is the dynamic file name, which is used as the params to catch the dynmic route value

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postid}`);
    const singlePost = await response.json();
    
    // if the id is invalid and there is no data from the database, then show the 404 page by returning "noteFound: true"
    if (!singlePost.id) {
        return {notFound: true,}
    }

    // if data is available to show, return the single object data 
    return {
        props:{
            singlePost
        }
    }
}