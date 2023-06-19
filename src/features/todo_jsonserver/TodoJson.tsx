import {
  fetchTodos,
  addTodo,
  updateTodo,
  checkedTodo,
  deleteTodo,
  Todo,
} from "./todoJsonSlice";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
const TodoJson = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todo_json.todos);
  const [edit, setEdit] = useState<Todo | null>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (edit) {
      const update = {
        ...edit,
        text,
      };
      dispatch(updateTodo(update));
    } else {
      dispatch(addTodo(text));
    }
    clearForm();
  };

  const handleEdit = (todo: Todo) => {
    setEdit(todo);
    setText(todo.text);
  };

  const clearForm = () => {
    setEdit(null);
    setText("");
  };

  return (
    <div className="space-y-2 border-2 border-blue-600 rounded-md p-5">
      <h1 className="text-xl font-semibold">Todo with JSON Server</h1>
      <form
        className="flex justify-between space-x-1 mx-auto "
        onSubmit={handleSubmit}
      >
        <input
          className="px-2 w-full py-1 border-2 border-blue-600 rounded-md focus:outline-none"
          type="text"
          autoComplete="off"
          name="inputTodo"
          placeholder="Input your todo "
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          className="bg-blue-600 rounded-md px-2 py-1 text-white"
          type="submit"
        >
          {edit ? "Save" : "Add"}
        </button>
        {edit && (
          <button
            onClick={clearForm}
            className="bg-red-600 rounded-md px-2 py-1 text-white"
          >
            Cancel
          </button>
        )}
      </form>
      <div>
        {todos?.map((todo, index) => (
          <div
            className={` ${
              todo.completed ? "bg-blue-300" : null
            } rounded-md border-b-2 border-blue-600 mb-1 py-1 px-2 shadow-md flex items-center justify-between`}
            key={todo.id}
          >
            <div className="text-lg flex justify-between space-x-2 items-center">
              <p className="w-3">{index + 1}</p>
              <input
                className="scale-125"
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(checkedTodo(todo))}
                readOnly
              />
              <p>{todo.text}</p>
            </div>
            <div className="space-x-1 text-sm font-medium">
              <button
                onClick={() => handleEdit(todo)}
                className="bg-blue-600 rounded-md px-2 py-[2px] text-white"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="bg-red-600 rounded-md px-2 py-[2px] text-white"
              >
                Del
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoJson;
