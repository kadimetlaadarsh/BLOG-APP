import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

//GET ALL BLOGS
const getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user', 'username');

        if (!blogs || blogs.length === 0) {
            return res.status(200).send({
                success: false,
                message: "No blogs found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Got blogs successfully",
            blogs: blogs.map(blog => ({
                id: blog._id,
                title: blog.title,
                description: blog.description,
                image: blog.image,
                username: blog.user ? blog.user.username : 'Unknown', // Safely access user.username
                createdAt: blog.createdAt
            }))
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in fetching blogs"
        });
    }
};


//create blogs
const createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
 
        // Check if all fields are provided
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the fields",
            });
        }

        // Validate the user ID
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).send({
                success: false,
                message: "Invalid user ID",
            });
        }

        // Find the existing user
        const existingUser = await userModel.findById(user);

        // Validate the existing user
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "Unable to find user",
            });
        }

        // Create the new blog
        const newBlog = new blogModel({ title, description, image, user });

        try {
            // Save the new blog
            await newBlog.save();
            
            // Add the new blog to the user's blogs array
            existingUser.blogs.push(newBlog);
            
            // Save the updated user
            await existingUser.save();

            return res.status(201).send({
                success: true,
                message: "New blog added",
                blog: newBlog,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error saving blog or updating user",
                error: error.message,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

//update blogs
const updateBlogController = async(req,res) =>{
    const {id} = req.params
    try {
        const {title,description,image} = req.body
        const blogs = await blogModel.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        return res.status(200).send({
            success:true,
            message:"Blog has Been updated"
        })
    } catch (error) {
        console.log(error);
        return res.status(201).send({
            success:false,
            "message":"error in update callback"
        })
    }

}

//DELETE BLOG
const deleteBlogController = async(req,res) =>{
    const {id} = req.params
    try {
        const {title,description,image} = req.body
        const blogs = await blogModel.findByIdAndDelete({_id:id}).populate("user");
        await blogs.user.blogs.pull(blogs);
        await blogs.user.save();
        return res.status(200).send({
            success:true,
            message:"Deleted sucessfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(201).send({
            success:false,
            message:"error in callback delete blog"
        })
    }


}

//GET Single user
const getSingleBlogById = async(req,res) =>{
    const {id} = req.params
    try {
        const data = await blogModel.findById({_id:id})
        return res.status(200).send({
            success:true,
            message:"got id",
            data
        })
    } catch (error) {
        console.log(error);
        return res.status(200).send({
            success:false,
            message:"error in getsingleblog callback"
        })
    }

}

const getUserBlogById = async(req,res) =>{
    const {id} = req.params
    try {
        const userBlogs = await userModel.findById({_id:id}).populate("blogs");
        if(!userBlogs){
            return res.status(404).send({
                success:false,
                message:"no blogs in user"
            })
        }
        return res.status(200).send({ 
            success:true,
            message:"user blogs",
            userBlogs
        })
    } catch (error) {
        console.log(error);
        return res.status(200).send({
            success:false,
            message:"error in getUserBlogById callback"
        })
    }
}

export {getAllBlogsController,createBlogController,updateBlogController,deleteBlogController,getSingleBlogById,getUserBlogById}