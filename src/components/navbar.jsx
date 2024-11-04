import { useState } from "react";
import { useRoutes } from "react-router-dom";
import { Link } from "react-router-dom";

import "./navbar.css";

function NavBar() {
  const [count, setCount] = useState(0);

  return (
    <div className="navbar-container">
      <Link to={"/"}>Home</Link>
      <Link to={"/create"}>Create</Link>
      <Link to={"gallery"}>Gallery</Link>
    </div>
  );
}

export default NavBar;
