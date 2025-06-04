import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
} from "../redux/actions";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [title, setTitle] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!title.trim()) return;
    const newTodo = {
      id: uuidv4(),
      title,
      status: false,
    };
    dispatch(addTodo(newTodo));
    setTitle("");
  };

  return (
    <Box p={4}>
      <HStack>
        <Input
          placeholder="Enter todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleAdd}>
          Add
        </Button>
      </HStack>

      <VStack spacing={3} align="stretch" mt={4}>
        {todos.map((todo) => (
          <HStack key={todo.id} justifyContent="space-between">
            <Checkbox
              isChecked={todo.status}
              onChange={() => dispatch(toggleTodo(todo.id))}
            >
              <Text
                as={todo.status ? "del" : ""}
                fontWeight="medium"
              >
                {todo.title}
              </Text>
            </Checkbox>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              Delete
            </Button>
          </HStack>
        ))}
      </VStack>

      <Box mt={6}>
        <Text fontSize="sm" color="gray.500">
          Stringified State:
        </Text>
        <pre style={{ fontSize: "12px" }}>
          {JSON.stringify(todos, null, 2)}
        </pre>
      </Box>
    </Box>
  );
}
