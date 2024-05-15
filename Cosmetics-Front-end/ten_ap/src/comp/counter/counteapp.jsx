import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./action/counter";
import { Link, Outlet } from "react-router-dom";

const CounterApp = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Couter ={counter}</h1>
      <button type="button" onClick={() => dispatch(increment(5))}>
        Tang
      </button>
      <button type="button" onClick={() => dispatch(decrement(5))}>
        Giam
      </button>
      <div style={{ marginTop: "10px" }}>
        <Link to="/">Todo</Link>
      </div>
      <div>
        <Link to="/counter/app1">App1</Link>
        <Link to="/counter/app2">App2</Link>
        <Link to="/counter/app3">App3</Link>
        <Link to="/counter/app4">App4</Link>
        <Link to="/counter/app5">App5</Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
};
export default CounterApp;
