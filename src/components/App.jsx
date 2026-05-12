import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";
import { TOYS_URL } from "../api";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch(TOYS_URL)
      .then((response) => response.json())
      .then((toys) => setToys(toys));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    setToys((toys) => [...toys, newToy]);
  }

  function handleLikeToy(updatedToy) {
    setToys((toys) =>
      toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  function handleDeleteToy(deletedToy) {
    setToys((toys) => toys.filter((toy) => toy.id !== deletedToy.id));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;
