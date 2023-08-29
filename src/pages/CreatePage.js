import BlogForm from "../components/BlogForm";

const CreatePage = ({addToast}) => {
    return (
        <BlogForm addToast={addToast}/>
    );
}

export default CreatePage;