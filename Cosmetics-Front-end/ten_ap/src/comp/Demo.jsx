import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function WellCome(props) {
  //   if (props.name.length < 5) {
  //     return (
  //       <>
  //         <h1>Name không hợp lệ</h1>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <h1>Hello, {props.name}</h1>
  //       </>
  //     );
  //   }

  //   return <>{props.name.length < 5 ? "Name không hợp lệ" : "Name hợp lệ"}</>;

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Mouted or updated" + props.name);

    return () => {
        console.log("Unmouted");
      };
  });

  useLayoutEffect(() => {


  }, [])


// 0.  Chạy vào useLayoutEffect (đồng bộ)
// 1.  Khởi tạo thành công giao diện
// 2.  Chạy vào useEffect -> call API lấy data (chạy bất đồng bộ)
// 3.  Render

  return (
    <>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -
      </button>

      <Link to="/page_2">Go to page 2</Link>
    </>
  );
}

export default WellCome;