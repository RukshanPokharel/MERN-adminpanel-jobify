import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import BlogInfo from './BlogInfo'

const Blog = ({
    _id,
    title,
    subtitle,
    author,
    description,
    readmore,
    createdAt,
    fulltext,
    blogImage,
    landingPage
}) => {
    const { setEditBlog, deleteBlog } = useAppContext()

    let date = moment(createdAt)
    date = date.format('MMM Do, YYYY');
    const blogImageName = blogImage.substring(33);
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{title.charAt(0)}</div>
                <div className='info'>
                    <h5>{title}</h5>
                    <p>{subtitle}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <BlogInfo icon={<FaLocationArrow />} text={author} />
                    <BlogInfo icon={<FaCalendarAlt />} text={date} />
                    <BlogInfo icon={<FaBriefcase />} text={description} />

                    <img src={"../../blogImages/" + blogImageName} alt='blogImage' style={{ height: '150px', width: '150px' }} />
                </div>

                {landingPage ? (<>
                </>) : <>
                    <footer>
                        <div className='actions'>
                            <Link
                                to='/blog'
                                className='btn edit-btn'
                                onClick={() => setEditBlog(_id)}
                            >
                                Edit
                            </Link>
                            <button
                                type='button'
                                className='btn delete-btn'
                                onClick={() => deleteBlog(_id)}
                            >
                                Delete
                            </button>
                        </div>
                    </footer>
                </>}

            </div>
        </Wrapper>
    )
}

export default Blog
