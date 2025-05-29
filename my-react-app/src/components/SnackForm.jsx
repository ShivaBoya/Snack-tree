import React, { useState } from "react";

export default function SnackForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Sweet");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = () => {
    const id = `snk_${Date.now()}`
    const snack = {
      id,
      title,
      category,
      price: parseFloat(price),
      rating: parseFloat(rating),
      createdAt: Date.now(),
    };
    set(ref(db, snacks/$,{id}), snack);
    setTitle(""); setCategory("Sweet"); setPrice(""); setRating("");
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Sweet</option>
        <option>Savory</option>
        <option>Beverage</option>
        <option>Baked</option>
      </select>
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      <input value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" />
      <button onClick={handleSubmit}>Add Snack</button>
    </div>
  );
}