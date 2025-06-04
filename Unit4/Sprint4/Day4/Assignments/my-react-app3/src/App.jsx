import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  Container,
  Heading,
  Button,
  Flex,
  Spacer,
  Box,
  useDisclosure,
} from "@chakra-ui/react";

import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import BookFilter from "./components/BookFilter";
import BookDetails from "./components/BookDetails";
import EditBook from "./components/EditBook";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container maxW="container.md" py={6}>
      <Flex mb={6} alignItems="center">
        <Heading>Book Library</Heading>
        <Spacer />
        <Button colorScheme="teal" onClick={onOpen}>
          Add New Book
        </Button>
      </Flex>

      <BookFilter />
      <BookList />
      <BookForm isOpen={isOpen} onClose={onClose} />

      <Routes>
        <Route path="/" element={null} />
        <Route path="/details/:id" element={<BookDetails />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </Container>
  );
}
