import express from 'express';
import { getAllUsers, loginController, registerController } from '../controllers/userController.js'; // Add .js extension

const router = express.Router();

// get all users
router.get('/all-users', getAllUsers);

// create user || post
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController);

export default router;
