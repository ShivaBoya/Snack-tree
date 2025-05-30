import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export default function Analytics() {
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    const snacksRef = ref(db, 'snacks');
    const unsubscribe = onValue(snacksRef, (snapshot) => {
      const data = snapshot.val() || {};
      setSnacks(Object.values(data));
    });
    return () => unsubscribe();
  }, []);

  const total = snacks.length;
  const avgPrice = (snacks.reduce((sum, s) => sum + (s.price || 0), 0) / total || 0).toFixed(2);
  const avgRating = (snacks.reduce((sum, s) => sum + (s.rating || 0), 0) / total || 0).toFixed(2);
  const categories = snacks.reduce((acc, s) => {
    const cat = s.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  const mostCommonCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
  const highest = [...snacks].sort((a, b) => (b.price || 0) - (a.price || 0))[0];
  const lowest = [...snacks].sort((a, b) => (a.price || 0) - (b.price || 0))[0];

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">Snack Analytics</h1>
      <ul className="space-y-2">
        <li>Total snacks: {total}</li>
        <li>Average price: ${avgPrice}</li>
        <li>Average rating: {avgRating}⭐</li>
        <li>Most common category: {mostCommonCategory}</li>
        <li>Highest priced snack: {highest?.title} (${highest?.price})</li>
        <li>Lowest priced snack: {lowest?.title} (${lowest?.price})</li>
      </ul>
      <a href="/" className="inline-block mt-4 text-blue-600 hover:underline">
        ⬅ Back to Home
      </a>
    </div>
  );
}
