import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

function FighterInfo() {
  const { id } = useParams();
  const [fighter, setFighter] = useState(null);

  useEffect(() => {
    const fetchFighter = async () => {
      const { data, error } = await supabase
        .from("Bilguun")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching fighter:", error.message);
      else setFighter(data);
    };

    fetchFighter();
  }, [id]);

  if (!fighter) return <p>Loading...</p>;

  return (
    <div className="fighter-info">
      <h1>{fighter.name}</h1>
      <p>Strength: {fighter.strength}</p>
      <p>Agility: {fighter.agility}</p>
      <p>Stamina: {fighter.stamina}</p>
      <p>{fighter.strength > 20 ? "Strong" : "Normal Strength"}</p>
      <p>{fighter.stamina > 20 ? "Huge Stamina" : "Normal Stamina"}</p>
      <p>{fighter.agility > 20 ? "Huge Agility" : "Normal Agility"}</p>
    </div>
  );
}

export default FighterInfo;
