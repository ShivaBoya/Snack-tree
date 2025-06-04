import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/actions";
import { HStack, Input, Select, Box } from "@chakra-ui/react";

export default function BookFilter() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    author: "",
    genre: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    dispatch(setFilter(updatedFilters));
  };

  return (
    <Box mb={4}>
      <HStack spacing={3}>
        <Input
          name="author"
          placeholder="Filter by Author"
          value={filters.author}
          onChange={handleChange}
        />
        <Input
          name="genre"
          placeholder="Filter by Genre"
          value={filters.genre}
          onChange={handleChange}
        />
        <Select
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </Select>
      </HStack>
    </Box>
  );
}
