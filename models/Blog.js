import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide title'],
            maxlength: 50,
        },
        subtitle: {
            type: String,
            required: [true, 'Please provide subtitle'],
            maxlength: 200,
        },
        author: {
            type: String,
            required: [true, 'Please provide author'],
            maxlength: 50,
        },
        description: {
            type: String,
            required: [true, 'Please provide description'],
            maxlength: 200,
        },
        readmore: {
            type: String,
            required: [true, 'Please provide readmore'],
            maxlength: 200,
        },
        fulltext: {
            type: String,
            required: [true, 'Please provide fulltext'],
            maxlength: 200,
        },
        blogImage: {
            type: String,
            // required: [true, 'Please provide fulltext'],
            // maxlength: 200,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },
    },
    { timestamps: true }
)

export default mongoose.model('Blog', BlogSchema)
