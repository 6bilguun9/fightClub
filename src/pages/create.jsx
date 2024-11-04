import { useState } from "react";
import supabase from "../supabaseClient";
import "/src/styles/create.css";

function Create() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [strength, setStrength] = useState("");
  const [agility, setAgility] = useState("");
  const [stamina, setStamina] = useState("");
  const handleSubmit = async () => {
    const { data, error } = await supabase.from("Bilguun").insert([
      {
        name,
        strength: parseInt(strength),
        agility: parseInt(agility),
        stamina: parseInt(stamina),
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      console.log("Data inserted successfully:", data);
      setName("");
      setStrength("");
      setAgility("");
      setStamina("");
    }
  };
  return (
    <div className="create-container">
      <h1 className="text">Create a new fighter</h1>
      <div className="info">
        <div className="name">
          <h1>Name</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="name">
          <h1>Strength</h1>
          <input
            type="number"
            value={strength}
            onChange={(e) => {
              setStrength(e.target.value);
            }}
          />
        </div>
        <div className="name">
          <h1>Agility</h1>
          <input
            type="number"
            placeholder=""
            value={agility}
            onChange={(e) => {
              setAgility(e.target.value);
            }}
          />
        </div>
        <div className="name">
          <h1>Stamina</h1>
          <input
            type="number"
            value={stamina}
            onChange={(e) => {
              setStamina(e.target.value);
            }}
          />
        </div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Create;
