import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/actions";
import { v4 as uuidv4 } from "uuid";

export default function BookForm({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (formData.title && formData.author && formData.genre) {
      const newBook = {
        ...formData,
        id: uuidv4(),
        status: false,
      };
      dispatch(addBook(newBook));
      setFormData({ title: "", author: "", genre: "" });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
            Add Book
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
