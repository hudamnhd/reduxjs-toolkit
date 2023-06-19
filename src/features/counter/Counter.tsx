import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <section className="flex flex-col items-center space-y-2 border-2 border-blue-600 rounded-md w-fit p-5">
      <p className="font-semibold">Counter by Redux</p>
      <p className="text-2xl">{count}</p>
      <div className="space-x-2">
        <button
          className="px-3 py-1 rounded-md bg-blue-600 text-white"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <button
          className="px-3 py-1 rounded-md bg-blue-600 text-white"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="px-3 py-1 rounded-md bg-blue-600 text-white"
          onClick={() => dispatch(incrementByAmount(10))}
        >
          10
        </button>
      </div>
      {count !== 0 && (
        <button
          className="px-3 py-1 text-sm rounded-md bg-red-600 text-white mx-1"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      )}
    </section>
  );
};

export default Counter;
