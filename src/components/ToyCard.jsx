import React from "react";
import { TOYS_URL } from "../api.js";

function ToyCard({ toy, onLikeToy, onDeleteToy }) {
  const { id, name, image, likes } = toy;

  function handleLikeClick() {
    fetch(`${TOYS_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((response) => response.json())
      .then((updatedToy) => onLikeToy(updatedToy));
  }

  function handleDonateClick() {
    fetch(`${TOYS_URL}/${id}`, {
      method: "DELETE",
    }).then(() => onDeleteToy(toy));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDonateClick}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
