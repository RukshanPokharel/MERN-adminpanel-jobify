import express from 'express';
// file upload imports
import multer from 'multer';
import uuidv4 from 'uuid/v4.js'
import Blog from '../models/Blog.js';

const router = express.Router();

const DIR = './blogImages/';

import {
    createBlog,
    deleteBlog,
    getAllBlogs,
    updateBlog,
} from '../controllers/blogController.js';

import testUser from '../middleware/testUser.js';

// file upload function
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName);
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.route('/').post(testUser, upload.single('blogImage'), createBlog).get(getAllBlogs);
// remember about :id
router.route('/:id').delete(testUser, deleteBlog).patch(testUser, updateBlog);

export default router;
