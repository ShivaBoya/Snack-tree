import { useState } from 'react'
import './App.css'
import TodoList from "./Components/TodoList";
import {Box, Heading} from "@chakra-ui/react"

function App() {

  return (
    <>
      <Box maxW="lg" mx="auto" mt="40px">
      <Heading textAlign="center" mb={6}>
        Redux Todo App
      </Heading>
      <TodoList />
    </Box>
    </>
  )
}

export default App
