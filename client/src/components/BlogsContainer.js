import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';
import Blog from './Blog';

const BlogsContainer = (props) => {
    const {
        getBlogs,
        blogs,
        isLoading,
        page,
        totalBlogs,
        search,
        searchStatus,
        searchType,
        sort,
        numOfPages,
        showAlert,
    } = useAppContext();

    useEffect(() => {
        getBlogs(props.landingPage);

        return () => {
            getBlogs(props.landingPage);
        }
        // eslint-disable-next-line
    }, [page, search, searchStatus, searchType, sort])

    if (isLoading) {
        return <Loading center />;
    }

    if (blogs.length === 0) {
        return (
            <Wrapper>
                <h2>No blogs to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            {showAlert && <Alert />}
            <h5>
                {totalBlogs} blog{blogs.length > 1 && 's'} found
            </h5>
            <div className='jobs'>
                {blogs.map((blog) => {
                    return <Blog key={blog._id} {...blog} landingPage={props.landingPage} />;
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    );
};

export default BlogsContainer;
