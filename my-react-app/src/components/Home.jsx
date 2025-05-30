import React, { useEffect, useState } from 'react';
import { ref, onValue, set, remove } from 'firebase/database';
import { db } from '../firebase';
import SnackCard from './SnackCard';
import SnackForm from './SnackForm';

export default function Home() {
  const [snacks, setSnacks] = useState([]);
  const [filteredSnacks, setFilteredSnacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingSnack, setEditingSnack] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const snacksPerPage = 6;

  useEffect(() => {
    const snacksRef = ref(db, 'snacks');
    onValue(snacksRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loaded = Object.values(data).sort((a, b) => b.createdAt - a.createdAt);
      setSnacks(loaded);
    });
  }, []);

  useEffect(() => {
    let result = snacks;

    if (searchTerm) {
      result = result.filter(snack =>
        snack.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(snack => snack.category === category);
    }

    if (showFavoritesOnly) {
      result = result.filter(snack => snack.favorite);
    }

    if (sort === 'title_asc') result.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === 'title_desc') result.sort((a, b) => b.title.localeCompare(a.title));
    else if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

    setFilteredSnacks(result);
  }, [searchTerm, snacks, category, sort, showFavoritesOnly]);

  const lastIndex = currentPage * snacksPerPage;
  const firstIndex = lastIndex - snacksPerPage;
  const currentSnacks = filteredSnacks.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredSnacks.length / snacksPerPage);

  const handleDelete = (id) => {
    remove(ref(db, `snacks/${id}`));
  };

  const handleFavoriteToggle = (snack) => {
    const updatedSnack = { ...snack, favorite: !snack.favorite };
    set(ref(db, `snacks/${snack.id}`), updatedSnack);
  };

  return (
    <div className="container">
      <h1>SnackShelf</h1>

      <div className="top-bar">
        <input
          autoFocus
          type="text"
          placeholder="Search snacks..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select onChange={e => setCategory(e.target.value)} value={category}>
          <option value="">All Categories</option>
          <option value="Sweet">Sweet</option>
          <option value="Savory">Savory</option>
          <option value="Beverage">Beverage</option>
          <option value="Baked">Baked</option>
        </select>

        <select onChange={e => setSort(e.target.value)} value={sort}>
          <option value="">Sort By</option>
          <option value="title_asc">Title A–Z</option>
          <option value="title_desc">Title Z–A</option>
          <option value="price_asc">Price Low–High</option>
          <option value="price_desc">Price High–Low</option>
          <option value="rating">Rating</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={e => setShowFavoritesOnly(e.target.checked)}
          /> Show Favorites Only
        </label>

        <button onClick={() => { setEditingSnack(null); setShowForm(true); }}>Add Snack</button>
        <a href="/analytics">Go to Analytics</a>
      </div>

      <div className="grid">
        {currentSnacks.map(snack => (
          <SnackCard
            key={snack.id}
            snack={snack}
            onEdit={() => { setEditingSnack(snack); setShowForm(true); }}
            onDelete={handleDelete}
            onToggleFavorite={() => handleFavoriteToggle(snack)}
          />
        ))}
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>{i + 1}</button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
      </div>

      {showForm && (
        <SnackForm
          existing={editingSnack}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
