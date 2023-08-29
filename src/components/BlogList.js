import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import {useHistory, useLocation} from 'react-router-dom';
import LodingSpinner from "../components/LoadingSpinner";
import { bool } from "prop-types";
import Pagination from "./Pagination";
import useToast from "../hooks/toast";




const BlogList = ({isAdmin}) => {
    const history = useHistory();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    
    const [numberOfPosts, setNumberOfPosts] = useState(0);//총 포스트 수
    const [numberOfPages, setNumberOfPages] = useState(0);//총 페이지 수
    const limit = 2;//페이지 당 글 갯수

    const [searchText, setSearchText] = useState('');
    const {addToast} = useToast();


    const getPosts = (page = 1) =>{

        setCurrentPage(page);

        let params = {
            _page: page,
            _limit: limit,
            _sort: 'id',
            _order: 'desc',
            title_like : searchText
        }
        
        if(!isAdmin){
            params = {...params, publish: false}
        }

        axios.get(`http://localhost:3001/posts`, {
            params
        }).then((res)=>{
            setPosts(res.data);
            setLoading(false); // 로딩 완료
            setNumberOfPosts(res.headers['x-total-count'])
        })
    }
    
    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfPosts/limit))
    },[numberOfPosts]);

    useEffect(() => {
        getPosts(parseInt(pageParam) || 1);
    },[pageParam]);


    const pageSet = (Page) => {
        history.push(`${location.pathname}?page=${Page}`);
        getPosts(Page);
    }



    const deleteBlog = (e, id) => {
        e.stopPropagation();
        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
            setPosts(prevPosts => prevPosts.filter(post => post.id !==id));
            addToast({
                text : "Successfully delete",
                type : "success"
            });
        })
    }

    const onSearch = (e) =>{
        if(e.key == 'Enter') {
            getPosts(1);
        }
    }

    if (loading) {
        return <LodingSpinner/>
    }

    return (
        <>
            <input
                type="text"
                placeholder="Search.."
                className="form-control mb-4"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={onSearch}
            />
            <div>
                {posts.length > 0 ? (
                    <>
                        {posts.map((post) => 
                            <Card
                            key={post.id}
                            post={post}
                            onClick={() => history.push(`/blogs/${post.id}`)}
                            >
                                {isAdmin ? 
                                <button 
                                className="btn btn-danger btn-sm"
                                onClick ={(e) => deleteBlog(e, post.id)}
                                >Delete</button> : null}
                            </Card>
                        )}
                    </> 
                ) :(
                    <div>데이터가 없습니다</div>
                    )}
            </div>
            {numberOfPages > 1 && 
                <Pagination currentPage={currentPage} numberOfPages={numberOfPages} limit={5} pageSet={pageSet}/>
            }
        </>
    );
}

BlogList.propTypes = {
    isAdmin: bool
}

BlogList.defaultProps = {
    isAdmin: false
}

export default BlogList;