import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const Blogs = () => {
  const [blogs,setBlogs] = useState([])

  const getAllBlogs = async () => {
    try {
      const {data} = await axios.get('api/v1/blog/all-blog')
      console.log(data);
      if(data?.success){
        setBlogs(data.blogs)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllBlogs();
  },[])



  return (
    <div>
    {blogs && blogs.map((blog)=> <BlogCard
      title={blog.title}
      description={blog.description}
      image={blog.image}
      username={blog.username}
      time={blog.createdAt} 
    />)}
    </div>

  )
}

export default Blogs