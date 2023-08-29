import { useEffect, useState} from "react";
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import { bool } from "prop-types";
import { useParams } from "react-router-dom";
import useToast from "../hooks/toast";


const BlogForm = ({editing}) => {

    const history = useHistory();
    const {id} = useParams();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [originalTitle, setOriginalTitle] = useState('');
    const [originalBody, setOriginalBody] = useState('');

    const [publish, setPublish] = useState(false);
    const [originalPublish, setOriginalPublish] = useState(false);

    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
    const {addToast} = useToast();

    

    useEffect(() => {
        if(id){
            axios.get(`http://localhost:3001/posts/${id}`).then((res)=>{
                setTitle(res.data.title);
                setBody(res.data.body);
                setPublish(res.data.publish);
                setOriginalTitle(res.data.title);
                setOriginalBody(res.data.body);
                setOriginalPublish(res.data.publish);
            })
        }
    },[]);

    const isEdited = () => {
        return title !== originalTitle 
        || body !== originalBody 
        || publish !== originalPublish;
    }
    
    const goBack = () => {
        if(editing){
            history.push(`/blogs/${id}`);
        }else{
            history.push(`/blogs`);
        }
    }

    const validateForm = () => {
        let validate = true;
        setTitleError(false);
        setBodyError(false);

        if(title === ''){
            setTitleError(true);
            validate = false;
        }
        if(body === ''){
            setBodyError(true);
            validate = false;
        }

        return validate;
    }
    
    const onSubmit = () => {
        if(validateForm()){
            if(editing){
                axios.patch(`http://localhost:3001/posts/${id}`, {
                    title,
                    body,
                    publish
              }).then(()=>{
                history.push('/blogs')
                addToast({
                    text : "Successfully edit",
                    type : "success"
                });
            })
            }else{
                axios.post('http://localhost:3001/posts', {
                    title,
                    body,
                    publish,
                    createdAt: Date.now()
              }).then(()=>{
                history.push('/blogs')
                addToast({
                    text : "Successfully create",
                    type : "success"
                });
            })
            }
        }


    }

    const onChangePublish = (e) => {
        setPublish(e.target.checked);
    }



    return(
        <div>
            <h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
            <div>
                <label className="form-label">Title</label>
                <input 
                value={title}
                className={`form-control ${titleError ? 'border-danger' : ''}`}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                />
            </div>
            
            {titleError && 
                <div className="text-danger mb-3">
                    Title is required
                </div>
            }


            <div>
                <label className="form-label">Body</label>
                <textarea
                    value={body} 
                    className={`form-control ${bodyError ? 'border-danger' : ''}`}
                    onChange={(e) => {
                    setBody(e.target.value);
                    }}
                    rows="5"
                />
            </div>

            {bodyError && 
                <div className="text-danger mb-3">
                    Body is required
                </div>
            }
            
            <div className="form-check mb-2">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={publish}
                    onChange={onChangePublish}
                />
                <label
                    className="form-check-label"
                >
                    Publish
                </label>
            </div>

            <button 
                className="btn btn-primary"
                onClick={onSubmit}
                disabled={editing && !isEdited()}
            >
                {editing ? 'Edit' : 'Create'}
            </button>

            <button 
                className="btn btn-danger ms-2"
                onClick={goBack}
            >
                Cancel
            </button>

        </div>
    );
};

BlogForm.proptype = {
    editing : bool
}
BlogForm.defaultType = {
    editing : false
}


export default BlogForm;