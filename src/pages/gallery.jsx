import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import "/src/styles/gallery.css";

function Gallery() {
  const [fighters, setFighters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFighter, setEditingFighter] = useState(null);

  // Fetch data from the Supabase table when the component mounts
  useEffect(() => {
    fetchFighters();
  }, []);

  // Function to fetch fighters
  const fetchFighters = async () => {
    const { data, error } = await supabase.from("Bilguun").select("*");
    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      setFighters(data);
    }
    setLoading(false);
  };

  // Function to delete a fighter
  const handleDelete = async (id) => {
    const { error } = await supabase.from("Bilguun").delete().eq("id", id);
    if (error) {
      console.error("Error deleting data:", error.message);
    } else {
      setFighters(fighters.filter((fighter) => fighter.id !== id)); // Update local state
    }
  };

  // Function to update a fighter
  const handleUpdate = async (updatedFighter) => {
    const { error } = await supabase
      .from("Bilguun")
      .update({
        name: updatedFighter.name,
        strength: updatedFighter.strength,
        agility: updatedFighter.agility,
        stamina: updatedFighter.stamina,
      })
      .eq("id", updatedFighter.id);
    if (error) {
      console.error("Error updating data:", error.message);
    } else {
      setFighters(
        fighters.map((fighter) =>
          fighter.id === updatedFighter.id ? updatedFighter : fighter
        )
      );
      setEditingFighter(null); // Exit edit mode after update
    }
  };

  // Function to get a description based on fighter stats
  const getDescription = (fighter) => {
    const descriptions = [];
    if (fighter.strength > 20) descriptions.push("Strong");
    if (fighter.stamina > 20) descriptions.push("Huge Stamina");
    if (fighter.agility > 20) descriptions.push("Huge Agility");
    return descriptions.length ? descriptions.join(", ") : "Normal Stats";
  };

  return (
    <div className="gallery-container">
      <h1>Fighter Gallery</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="fighters-list">
          {fighters.map((fighter) => (
            <div key={fighter.id} className="fighter-card">
              {editingFighter?.id === fighter.id ? (
                <div>
                  <input
                    type="text"
                    value={editingFighter.name}
                    onChange={(e) =>
                      setEditingFighter({
                        ...editingFighter,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    value={editingFighter.strength}
                    onChange={(e) =>
                      setEditingFighter({
                        ...editingFighter,
                        strength: parseInt(e.target.value),
                      })
                    }
                  />
                  <input
                    type="number"
                    value={editingFighter.agility}
                    onChange={(e) =>
                      setEditingFighter({
                        ...editingFighter,
                        agility: parseInt(e.target.value),
                      })
                    }
                  />
                  <input
                    type="number"
                    value={editingFighter.stamina}
                    onChange={(e) =>
                      setEditingFighter({
                        ...editingFighter,
                        stamina: parseInt(e.target.value),
                      })
                    }
                  />
                  <button onClick={() => handleUpdate(editingFighter)}>
                    Save
                  </button>
                  <button onClick={() => setEditingFighter(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <Link to={`/fighter/${fighter.id}`}>
                    <h2>{fighter.name}</h2>
                  </Link>
                  <p>Strength: {fighter.strength}</p>
                  <p>Agility: {fighter.agility}</p>
                  <p>Stamina: {fighter.stamina}</p>
                  <p>{getDescription(fighter)}</p>
                  <img
                    src="https://i.redd.it/11stk25dmv761.png"
                    alt="Fighter"
                    className="photo"
                  />
                  <button onClick={() => setEditingFighter(fighter)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(fighter.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
