import React from "react";
import { Box, Heading, VStack, Button, useDisclosure } from "@chakra-ui/react";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import BookFilter from "../components/BookFilter";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={5}>
      <Heading mb={4}>📚 Book Store</Heading>
      <Button onClick={onOpen} colorScheme="teal" mb={4}>Add New Book</Button>
      <BookFilter />
      <BookList />
      <BookForm isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
