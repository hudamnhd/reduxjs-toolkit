import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface TodoState {
  todos: Todo[];
}

// Define a type for the todo item
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define the initial state using that type
const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.todos = [...state.todos, newTodo];
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
