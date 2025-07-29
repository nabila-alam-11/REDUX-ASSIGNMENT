import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg  bg-light text-black">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Student Management System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Students
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/class">
                Classes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/school">
                School
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
