import { Link } from "react-router-dom";
import BlogList from "../components/BlogList";

const AdminPage = () => {
   
    return (
        <>
            <div className="d-flex justify-content-between">
                <h1>Admin</h1>
                <Link to="/blogs/create" className="btn btn-success mb-2 mt-2">Create</Link>
            </div>
            <BlogList isAdmin={true}/>
        </>
    );
}

export default AdminPage;