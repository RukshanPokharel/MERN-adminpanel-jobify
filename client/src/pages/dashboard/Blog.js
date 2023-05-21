import React, { useEffect, useState, ChangeEvent } from 'react'
import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import BlogsContainer from '../../components/BlogsContainer'

const Blog = () => {
    const { isLoading,
        isEditing,
        showAlert,
        displayAlert,
        title,
        subtitle,
        author,
        description,
        readmore,
        fulltext,
        blogImage,
        handleChange,
        handleInputFileChange,
        clearBlogValues,
        createBlog,
        editBlog,


    } = useAppContext();

    // eslint-disable-next-line
    // const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !subtitle || !author || !description || !readmore || !fulltext || !blogImage) {
            displayAlert()
            return
        }
        if (isEditing) {
            editBlog()
            return
        }
        createBlog();

    }

    const handleJobInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            // setFile(e.target.files[0]);

            const name = e.target.name
            const value = e.target.files[0]
            handleInputFileChange({ name, value })
        }
    };

    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing ? 'edit blog' : 'add blog'}</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    {/* title */}
                    <FormRow
                        type='text'
                        name='title'
                        value={title}
                        handleChange={handleJobInput}
                    />
                    {/* subtitle */}
                    <FormRow
                        type='text'
                        name='subtitle'
                        value={subtitle}
                        handleChange={handleJobInput}
                    />
                    {/* author */}
                    <FormRow
                        type='text'
                        name='author'
                        value={author}
                        handleChange={handleJobInput}
                    />
                    {/* description */}
                    <FormRow
                        type='text'
                        name='description'
                        value={description}
                        handleChange={handleJobInput}
                    />
                    {/* readmore */}
                    <FormRow
                        type='text'
                        name='readmore'
                        value={readmore}
                        handleChange={handleJobInput}
                    />
                    {/* fulltext */}
                    <FormRow
                        type='text'
                        name='fulltext'
                        value={fulltext}
                        handleChange={handleJobInput}
                    />
                    {/* image */}
                    <FormRow
                        type='file'
                        name='blogImage'
                        // value={blogImage}
                        handleChange={handleFileChange}
                    />
                    {/* btn container */}
                    <div className='btn-container'>
                        <button
                            type='submit'
                            className='btn btn-block submit-btn'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                        <button
                            className='btn btn-block clear-btn'
                            onClick={(e) => {
                                e.preventDefault()
                                clearBlogValues()
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>

            <BlogsContainer landingPage={false} />
        </Wrapper>


    )
}

export default Blog