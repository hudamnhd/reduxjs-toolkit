import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the todo item
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define the initial state
interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// Define the async thunks for CRUD operations
export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const response = await axios.get("http://localhost:8080/todos");
  return response.data as Todo[];
});

export const addTodo = createAsyncThunk("todos/add", async (text: string) => {
  const response = await axios.post("http://localhost:8080/todos", {
    id: Date.now(),
    text,
    completed: false,
  });
  return response.data as Todo;
});

export const checkedTodo = createAsyncThunk(
  "todos/checked",
  async (todo: Todo) => {
    const response = await axios.put(`http://localhost:8080/todos/${todo.id}`, {
      ...todo,
      completed: todo.completed ? false : true,
    });
    return response.data as Todo;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/update",
  async (todo: Todo) => {
    const response = await axios.put(
      `http://localhost:8080/todos/${todo.id}`,
      todo
    );
    return response.data as Todo;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/todos/${id}`);
    return id;
  }
);

// Create the slice
const todoJsonSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(checkedTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(
          (todo) => todo.id === updatedTodo.id
        );
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(
          (todo) => todo.id === updatedTodo.id
        );
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const id = action.payload;
        state.todos = state.todos.filter((todo) => todo.id !== id);
      });
  },
});

export default todoJsonSlice.reducer;
