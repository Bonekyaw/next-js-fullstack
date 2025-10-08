import { NavLink } from "react-router";

const Navigation = () => {
  return (
    <nav>
      <div className="nav-container">
        <NavLink to="/" className="logo">
          SampleSite
        </NavLink>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Product
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
