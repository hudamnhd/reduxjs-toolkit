import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addTodo, toggleTodo, deleteTodo, Todo } from "./actions";

const TodoFirst = () => {
  const todos = useAppSelector((state) => state.todo_01.todos);
  const dispatch = useAppDispatch();
  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.todoText as HTMLInputElement;
    const text = input.value;
    if (text.length < 4) {
      return alert("min 4 letter");
    }
    dispatch(addTodo(text));
    input.value = "";
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="space-y-3 border-2 border-blue-500 rounded-md p-4">
      <h2 className="text-xl font-semibold">Todo List First</h2>
      <form className="flex items-center space-x-2" onSubmit={handleAddTodo}>
        <input
          autoComplete="off"
          className="ring ring-2 ring-blue-600 rounded-md px-2 py-1 focus:outline-none"
          type="text"
          name="todoText"
          placeholder="Enter a todo"
        />
        <button
          className="bg-blue-600 text-white mx-1 rounded-md px-3 py-1"
          type="submit"
        >
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {todos.map((todo: Todo) => (
          <li
            key={todo.id}
            className="flex justify-between bg-blue-50 p-2 rounded-md border-b-2 border-blue-600"
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <div className="flex items-center space-x-3 px-2">
              <input
                onChange={() => handleToggleTodo(todo.id)}
                className="scale-150"
                type="checkbox"
                checked={todo.completed}
              />
              <p className="text-xl font-medium">{todo.text}</p>
            </div>
            <div>
              <button
                className="text-sm bg-red-600 text-white mx-1 rounded-md px-3 py-1 "
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoFirst;
