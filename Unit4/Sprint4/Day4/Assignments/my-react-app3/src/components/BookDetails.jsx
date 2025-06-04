import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  VStack,
  StackDivider,
} from "@chakra-ui/react";

export default function BookDetails() {
  const { id } = useParams();
  const book = useSelector((state) =>
    state.books.find((book) => book.id === id)
  );

  if (!book) {
    return <Text>Book not found.</Text>;
  }

  return (
    <Box maxW="lg" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="lg" shadow="md">
      <VStack spacing={4} divider={<StackDivider />}>
        <Heading size="lg">{book.title}</Heading>
        <Text><strong>Author:</strong> {book.author}</Text>
        <Text><strong>Genre:</strong> {book.genre}</Text>
        <Badge colorScheme={book.status ? "green" : "red"}>
          {book.status ? "Read" : "Unread"}
        </Badge>
        <Link to="/">
          <Button colorScheme="teal">Back to Home</Button>
        </Link>
      </VStack>
    </Box>
  );
}
