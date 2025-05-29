import React, { useEffect, useState, useRef } from "react";
//import SnackForm from "../components/";
import FilterSort from "../FilterSort";
import Pagination from "../Pagination";
import SnackForm from "../SnackForm";

export default function Home() {
  const [snacks, setSnacks] = useState({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef();

  useEffect(() => {
    const snacksRef = ref(db, "snacks");
    return onValue(snacksRef, (snapshot) => {
      setSnacks(snapshot.val() || {});
    });
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const snackArray = Object.values(snacks);
  const filtered = snackArray
    .filter((s) => s.title.toLowerCase().includes(search.toLowerCase()))
    .filter((s) => category === "All" || s.category === category)
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return sortOrder === "asc"
        ? aVal > bVal ? 1 : -1
        : aVal < bVal ? 1 : -1;
    });

  const snacksPerPage = 6;
  const totalPages = Math.ceil(filtered.length / snacksPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * snacksPerPage,
    currentPage * snacksPerPage
  );

  return (
    <div style={{ padding: 20 }}>
      <input
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search snacks"
        style={{ padding: "6px", width: "100%", marginBottom: 10 }}
      />
      <FilterSort
        category={category}
        setCategory={setCategory}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    <SnackForm />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {paginated.map((snack) => (
          <div key={snack.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <h3>{snack.title}</h3>
            <p>{snack.category}</p>
            <p>${snack.price.toFixed(2)} | ⭐ {snack.rating}</p>
            <button onClick={() => remove(ref(db, snacks/$,{snack,id}))}>Delete</button>
          </div>
        ))}
      </div>
      <Pagination total={totalPages} current={currentPage} setCurrent={setCurrentPage} />
    </div>
  );
}