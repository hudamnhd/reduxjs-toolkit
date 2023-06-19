import Counter from "./features/counter/Counter";
import TodoFirst from "./features/todo_01/TodoFirst";
import TodoSecond from "./features/todo_02/TodoSecond";
import Content from "./features/todo_getdata/Content";
import TodoJson from "./features/todo_jsonserver/TodoJson";

const App = () => {
  return (
    <main className="grid grid-cols-3 gap-4 m-5 bg-slate-50">
      <TodoJson />
      <Content />
      <TodoSecond />
      <TodoFirst />
      <Counter />
    </main>
  );
};

export default App;
