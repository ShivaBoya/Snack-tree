import React, { useEffect, useState } from "react";
import { Box, Input, Button, VStack, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editBook } from "../redux/actions";

export default function EditBook() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = useSelector((state) =>
    state.books.find((book) => book.id === id)
  );

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editBook({ ...formData, id }));
    navigate("/");
  };

  if (!book) {
    return <Heading>Book not found</Heading>;
  }

  return (
    <Box maxW="400px" mx="auto" mt={8}>
      <Heading mb={4}>Edit Book</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={3}>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            isRequired
          />
          <Input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            isRequired
          />
          <Input
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Genre"
            isRequired
          />
          <Button type="submit" colorScheme="blue" w="100%">
            Save Changes
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
