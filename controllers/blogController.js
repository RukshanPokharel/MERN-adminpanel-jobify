import { StatusCodes } from 'http-status-codes';
import {
    BadRequestError,
    NotFoundError,
    UnAuthenticatedError,
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';
import Blog from '../models/Blog.js';

const createBlog = async (req, res) => {
    const { title,
        subtitle,
        author,
        description,
        readmore,
        fulltext } = req.body;

    const url = req.protocol + '://' + req.get('host');

    // access blogImage from request to store in database
    const blogImage = url + '/blogImages/' + req.file.filename;

    if (!title || !subtitle || !author || !description || !readmore || !fulltext) {
        throw new BadRequestError('Please provide all values');
    }

    req.body.createdBy = req.user.userId;
    req.body.blogImage = blogImage; //append blog image in the request body
    const blog = await Blog.create(req.body);
    res.status(StatusCodes.CREATED).json({ blog });
};

const getAllBlogs = async (req, res) => {
    const { status, sort, search, isLanding } = req.query;

    const queryObject = {
        // createdBy: req.user.userId,
    };

    if (!isLanding) {
        queryObject = {
            createdBy: req.user.userId,
        };
    }
    // const queryObject = {
    //     createdBy: req.user.userId,
    // };
    // add stuff based on condition

    if (status && status !== 'all') {
        queryObject.status = status;
    }

    if (search) {
        queryObject.position = { $regex: search, $options: 'i' };
    }
    // NO AWAIT

    let result = Blog.find(queryObject);

    // chain sort conditions

    if (sort === 'latest') {
        result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
        result = result.sort('position');
    }
    if (sort === 'z-a') {
        result = result.sort('-position');
    }


    // setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const blogs = await result;

    const totalBlogs = await Blog.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalBlogs / limit);

    res.status(StatusCodes.OK).json({ blogs, totalBlogs, numOfPages });
};

const updateBlog = async (req, res) => {
    const { id: blogId } = req.params;
    const { title,
        subtitle,
        author,
        description,
        readmore,
        fulltext } = req.body;

    if (!title || !subtitle || !author || !description || !readmore || !fulltext) {
        throw new BadRequestError('Please provide all values');
    }
    const blog = await Blog.findOne({ _id: blogId });

    if (!blog) {
        throw new NotFoundError(`No blog with id :${blogId}`);
    }
    // check permissions

    checkPermissions(req.user, blog.createdBy);

    const updatedBlog = await Blog.findOneAndUpdate({ _id: blogId }, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(StatusCodes.OK).json({ updatedBlog });
};

const deleteBlog = async (req, res) => {
    const { id: blogId } = req.params;

    const blog = await Blog.findOne({ _id: blogId });

    if (!blog) {
        throw new NotFoundError(`No blog with id :${blogId}`);
    }

    checkPermissions(req.user, blog.createdBy);

    await blog.remove();

    res.status(StatusCodes.OK).json({ msg: 'Success! Blog removed' });
};

export { createBlog, deleteBlog, getAllBlogs, updateBlog };
