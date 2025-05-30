import React from 'react';

export default function SnackCard({ snack, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className="card">
      <h3>{snack.title}</h3>
      <p>Category: {snack.category}</p>
      <p>Price: ${snack.price}</p>
      <p>Rating: {snack.rating}⭐</p>

      <div className="actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={() => onDelete(snack.id)}>Delete</button>
      </div>

      {}
      <button
        className={`favorite-icon ${snack.favorite ? 'favorited' : ''}`}
        onClick={onToggleFavorite}
        aria-label={snack.favorite ? 'Unfavorite snack' : 'Favorite snack'}
        title={snack.favorite ? 'Unfavorite' : 'Favorite'}
      >
        ★
      </button>
    </div>
  );
}
