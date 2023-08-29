import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "../components/Card";
import {useHistory} from 'react-router-dom';
import LodingSpinner from "../components/LoadingSpinner";

const ShowPage = () => {
    const history = useHistory();

    const {id} = useParams();

    const [posts, setPosts] = useState([]);
    
    const [loding, setLoding] = useState(true);

    const printDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    }


    const getPosts = () =>{
        console.log(id);
        axios.get(`http://localhost:3001/posts/${id}`).then((res)=>{
            setPosts(res.data);
            console.log(res.data);
            setLoding(false);
        })
    }

    useEffect(() => {
        getPosts();
    },[]);

    if(loding){
        return <LodingSpinner/>
    }

    return (
        <>
        <div> Show Page</div>
            <Card
            key={posts.id}
            post={posts}
            >
                <button 
                    className="btn btn-success btn-sm"
                    onClick ={() => history.push(`/blogs/edit/${posts.id}`)}
                >Edit</button>
                
            </Card>
            <button 
                    className="btn btn-primary"
                    onClick ={() => history.push('/blogs')}
                >List
            </button>
            <div>
                <small className="text-muted">{printDate(posts.createdAt)}</small>

            </div>
        </>
    );

}
export default ShowPage;