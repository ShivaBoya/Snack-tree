import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export default function SnackForm({ existing, onClose }) {
  const [title, setTitle] = useState(existing?.title || '');
  const [category, setCategory] = useState(existing?.category || 'Sweet');
  const [price, setPrice] = useState(existing?.price || '');
  const [rating, setRating] = useState(existing?.rating || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = existing?.id || `snk_${Date.now()}`;

    const snack = {
      id,
      title,
      category,
      price: parseFloat(price),
      rating: parseFloat(rating),
      createdAt: existing?.createdAt || Date.now(),
      favorite: existing?.favorite ?? false  
    };

    set(ref(db, `snacks/${id}`), snack);
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>{existing ? 'Edit Snack' : 'Add New Snack'}</h2>

        <input
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />

        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="Sweet">Sweet</option>
          <option value="Savory">Savory</option>
          <option value="Beverage">Beverage</option>
          <option value="Baked">Baked</option>
        </select>

        <input
          required
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Price"
          step="0.01"
        />

        <input
          required
          type="number"
          value={rating}
          onChange={e => setRating(e.target.value)}
          placeholder="Rating (1-5)"
          step="0.1"
          min="0"
          max="5"
        />

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
