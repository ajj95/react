import { Link, NavLink } from "react-router-dom";


const Navbar = () =>{
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/blogs">Blogs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin">Admin</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/blogs/create">Create</Link>
          </li>
        </ul>
      </nav>
    );
}
export default Navbar;