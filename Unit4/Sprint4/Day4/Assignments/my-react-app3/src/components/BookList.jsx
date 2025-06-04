import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, toggleReadStatus } from "../redux/actions";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function BookList() {
  const books = useSelector((state) => state.books);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const filteredBooks = books.filter((book) => {
    const matchesAuthor = filters.author
      ? book.author.toLowerCase().includes(filters.author.toLowerCase())
      : true;
    const matchesGenre = filters.genre
      ? book.genre.toLowerCase().includes(filters.genre.toLowerCase())
      : true;
    const matchesStatus =
      filters.status === "read"
        ? book.status
        : filters.status === "unread"
        ? !book.status
        : true;
    return matchesAuthor && matchesGenre && matchesStatus;
  });

  if (filteredBooks.length === 0) {
    return <Text>No books found matching the filters.</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      {filteredBooks.map((book) => (
        <Box
          key={book.id}
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          shadow="md"
        >
          <Heading size="md">{book.title}</Heading>
          <Text>Author: {book.author}</Text>
          <Text>Genre: {book.genre}</Text>
          <Badge colorScheme={book.status ? "green" : "red"}>
            {book.status ? "Read" : "Unread"}
          </Badge>
          <HStack spacing={2} mt={3}>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => dispatch(toggleReadStatus(book.id))}
            >
              Toggle Status
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => dispatch(deleteBook(book.id))}
            >
              Delete
            </Button>
            <Link to={`/edit/${book.id}`}>
              <Button size="sm" colorScheme="orange">
                Edit
              </Button>
            </Link>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}
