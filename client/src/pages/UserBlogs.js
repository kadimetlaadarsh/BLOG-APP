import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId');
            const { data } = await axios.get(`/api/v1/blog/get-user-blog/${id}`);
            if (data?.success) {
                setBlogs(data?.userBlogs.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserBlogs();
    }, []);

    return (
        <div>
            {blogs && blogs.map((blog) => (
                <BlogCard
                    key={blog._id} // Add key prop here
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    username={blog.user.username} // Correct the username field
                    time={blog.createdAt}
                />
            ))}
        </div>
    );
};

export default UserBlogs;
