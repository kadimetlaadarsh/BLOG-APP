import express from 'express';
import { getAllBlogsController, createBlogController, updateBlogController, deleteBlogController, getSingleBlogById,getUserBlogById } from '../controllers/blogController.js';

// route object
const router = express.Router();

// routes
// GET || all blogs
router.get('/all-blog', getAllBlogsController);

// POST || Create blog
router.post('/create-blog', createBlogController);

// PUT || update blog
router.put('/update-blog/:id', updateBlogController);

// DELETE || delete blog
router.delete('/delete-blog/:id', deleteBlogController);

// GET Single blog by ID
router.get('/get-blog/:id', getSingleBlogById);

//get user blog
router.get('/get-user-blog/:id',getUserBlogById);

export default router;
