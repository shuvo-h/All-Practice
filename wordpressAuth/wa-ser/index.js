const express = require('express')
const dotenv = require("dotenv")
dotenv.config();
const cors = require("cors");

const fetch = require("node-fetch");

const app = express()
const port = process.env.PORT || 5000

app.use(cors());

app.get("/wp-count", async (req,res)=>{
  // username and password
  const user = process.env.TOP_USER;
  const password = process.env.TOP_PASS;
  const dateAfter = (new Date("2022-06-01")).toISOString().slice(0,19);
  const dateBefore = (new Date("2022-07-01")).toISOString().slice(0,19)
  // organize headers
  const Headers = fetch.Headers;
  const headers = new Headers()
  headers.set("Content-Type","application/json")
  headers.set("Authorization","Basic " + Buffer.from(`${user}:${password}`).toString("base64"))
  // dates
  // const response = await fetch("https://ofnoteto.com/wp-json/wp/v2/posts?_fields[]=title&_fields[]=content&_fields[]=date").then(res=>res.json())
  // const response = await fetch("https://ofnoteto.com/wp-json/wp/v2/posts?_fields[]=title&_fields[]=date&_fields[]&after=2022-05-01T00:00:00&before=2022-06-01T00:00:00&page=1&per_page=100").then(res=>res.json())
  // const response = await fetch(`https://ofnoteto.com/wp-json/wp/v2/posts?_fields[]=title&_fields[]=date&_fields[]=content&_fields[]&after=${dateAfter}&before=${dateBefore}&page=1&per_page=10`).then(res=>res.json())
  // console.log(response.length," length");

  // loop to get data for all pages
  const allBlogs = [];
  let isMorePage = true;
  let pageCount = 1;
  while (isMorePage) {
    const blogData = await new Promise(async function (resolve,reject){
      const blogs = await fetch(`https://ofnoteto.com/wp-json/wp/v2/posts?_fields[]=title&_fields[]=date&_fields[]=content&_fields[]&after=${dateAfter}&before=${dateBefore}&page=${pageCount}&per_page=100`).then(res=>res.json())
      if (!blogs.length) {
        isMorePage = false;
      }
      resolve(blogs)
    })
    console.log(blogData.length, "page = ", pageCount);
    if (blogData.length) {
      allBlogs.push(blogData)
    }
    pageCount++;
  }
  // make flat of the blog
  const flattenBlogs = allBlogs.flat();
  // loop and count the total words of each blog post
  const blogs = [];
  let blog_i = 0;
  const blogsInfo = flattenBlogs.map(blog =>{
    // const txtHtml = response[0].content.rendered
    // console.log(flattenBlogs[blog_i]);
    const blogTEXT = flattenBlogs[blog_i].content?.rendered;
    const words = blogTEXT.replace(/<(?:.|\s)*?>/g, " ").replace(/\n/g," ").split(" ").filter(word=>word.length>0).length;
    blogs.push({words, title:blog.title.rendered, date:blog.date});
    // increase the blog counter
    blog_i++;
  })
  
  // res.json(blogs)
  res.json(blogs)
})

app.get('/wp-auth', async(req, res) => {

  const Headers = fetch.Headers;
  const headers = new Headers()
  headers.set("Content-Type","application/json")
  headers.set("Authorization","Basic " + Buffer.from(`${user}:${password}`).toString("base64"))
  // const response = await fetch("https://ofnoteto.com/wp-json/wp/v2/posts").then(res=>res.json())
  // const response = await fetch("https://ofnoteto.com/wp-json/wp/v2/posts?_fields[]=title&_fields[]=link&_fields[]=status&per_page=100").then(res=>res.json())
  // const response = await fetch("https://ofnoteto.com/wp-json/wp/v2/posts?_fields[]=title&_fields[]=content&_fields[]=date").then(res=>res.json())
  const response = await fetch("https://ofnoteto.com/wp-json/wp/v2/posts?_fields[]=content").then(res=>res.json())
  // const response = await fetch("https://ofnoteto.com/wp-json/wp/v2/posts").then(res=>res.json())
  console.log(response.length);

  const txtHtml = response[0].content.rendered
  // const puteText = txtHtml.replace(/<(?:.|\s)*?>/g, "").replace(/\n/g," ").replace(/  +/g, ' ');
  // calculate the total words of an article blog
  const puteText = txtHtml.replace(/<(?:.|\s)*?>/g, " ").replace(/\n/g," ").split(" ").filter(word=>word.length>0).length;

  res.json({puteText,txtHtml})
})

app.get('/', (req, res) => {
  res.send('Hello Wordpress World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


