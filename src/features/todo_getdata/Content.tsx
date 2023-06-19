import { fetchTodos } from "./actions";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const Content = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todo_getdata.todos);
  const loading = useAppSelector((state) => state.todo_getdata.loading);
  const error = useAppSelector((state) => state.todo_getdata.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="relative overflow-auto h-[400px] border-2 border-blue-600 rounded-md bg-blue-100 font-medium">
      <h1 className="bg-blue-600 text-white sticky top-0 w-full text-lg font-semibold mb-2 py-1 px-3">
        {todos.length} Todos (readonly){" "}
        <span className="text-sm font-normal">
          (jsonplaceholder.typicode.com/todos)
        </span>
      </h1>
      {todos?.map((item: { id: number; title: string; completed: boolean }) => (
        <div className="flex space-x-2 text-sm px-3" key={item.id}>
          <input type="checkbox" checked={item.completed} readOnly />
          <p>
            {item.id} ) {item.title.split(" ").slice(0, 4).join(" ")}{" "}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Content;
