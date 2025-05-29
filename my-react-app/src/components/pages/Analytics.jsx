import React, { useEffect, useState } from "react";

export default function Analytics() {
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    const snacksRef = ref(db, "snacks");
    return onValue(snacksRef, (snapshot) => {
      setSnacks(Object.values(snapshot.val() || {}));
    });
  }, []);

  const total = snacks.length;
  const avgPrice = (snacks.reduce((a, s) => a + s.price, 0) / total || 0).toFixed(2);
  const avgRating = (snacks.reduce((a, s) => a + s.rating, 0) / total || 0).toFixed(2);

  const categoryCount = snacks.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {});

  const mostCommonCategory = Object.entries(categoryCount).reduce((a, b) => a[1] > b[1] ? a : b, ["", 0])[0];
  const highest = snacks.reduce((a, b) => a.price > b.price ? a : b, {});
  const lowest = snacks.reduce((a, b) => a.price < b.price ? a : b, {});

  return (
    <div style={{ padding: 20 }}>
      <h2>Analytics</h2>
      <p>Total Snacks: {total}</p>
      <p>Average Price: ${avgPrice}</p>
      <p>Average Rating: {avgRating}</p>
      <p>Most Common Category: {mostCommonCategory}</p>
      <p>Highest Priced Snack: {highest?.title} - ${highest?.price}</p>
      <p>Lowest Priced Snack: {lowest?.title} - ${lowest?.price}</p>
    </div>
  );
}