import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addTodo, toggleTodo, deleteTodo } from "./todoSlice";

const TodoSecond = () => {
  const todos = useAppSelector((state) => state.todo_02.todos);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.todoText as HTMLInputElement;
    const text = input.value;
    dispatch(addTodo(text));
    input.value = "";
  };

  return (
    <div className="p-3 space-y-3 border-2 border-blue-600 rounded-md">
      <h1 className="text-xl font-semibold">Todo createSlice</h1>
      <form className="flex space-x-2" onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          className="px-3 py-1 ring ring-2 ring-blue-600 rounded-md focus:outline-none "
          type="text"
          name="todoText"
          placeholder="Input your task"
        />
        <button
          className="px-3 py-1 bg-blue-600 rounded-md text-white"
          type="submit"
        >
          Add
        </button>
      </form>
      <div>
        {todos.map((todo) => (
          <div
            className={`${
              todo.completed ? "bg-blue-200" : null
            } border-b-2 border-blue-600 py-1 px-2  mb-1  rounded-md flex justify-between space-y-1 items-center`}
            key={todo.id}
          >
            <div className="flex items-center space-x-2">
              <input
                onChange={() => dispatch(toggleTodo(todo.id))}
                className="scale-150"
                type="checkbox"
                checked={todo.completed}
              />
              <p className={`text-xl font-medium`}>{todo.text}</p>
            </div>

            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="text-sm px-3 py-1 bg-red-600 rounded-md text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoSecond;
