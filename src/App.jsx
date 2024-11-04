import { useState } from "react";
import { useRoutes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Gallery from "./pages/gallery";
import Create from "./pages/create";
import FighterInfo from "./pages/fighterInfo";

function App() {
  const [count, setCount] = useState(0);
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/gallery",
      element: <Gallery />,
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/fighter/:id",
      element: <FighterInfo />,
    },
  ]);

  return (
    <div className="container">
      <div>
        <Navbar />
      </div>
      <div className="content">{routes}</div>
    </div>
  );
}

export default App;
