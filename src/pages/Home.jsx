import { useState, useEffect } from "react";

import "/src/styles/main.css";
import supabase from "../supabaseClient";

function Home() {
  const [count, setCount] = useState(0);
  const [stats, setStats] = useState({});
  const [error, setError] = useState(0);
  useEffect(() => {
    const fetchStats = async () => {
      // 1. TODO: fetch all landmarks from the database in the table named "landmarks".
      const { data, error } = await supabase.from("Bilguun").select("*");
      console.log(data);
      if (error) {
        setError("Counld not fetch the Stats");
        setStats(null);
        console.log(error);
      }
      if (data) {
        setStats(data);
        setError(null);
      }
    };

    fetchStats();
  }, []);
  console.log(stats);
  return (
    <div className="home-container">
      <h1>Welcome to the punch club character Creator!</h1>
      <h2>
        Here is where you can create your very own set of characters before
        sending them off into the game!
      </h2>
      <img src="https://i.redd.it/11stk25dmv761.png" alt="" className="photo" />
    </div>
  );
}

export default Home;
