import React, { useReducer } from "react";
import reducer, { initState } from "./reducer";
import { addJob, deleteJob, setJob } from "./actions";
import { Link } from "react-router-dom";

// 1. Init state
// 2. Define actions
// 3. Viết reducer ứng với các action bên trên
// 4. Thực hiện dispatch các action tương ứng

const TodoApp = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { job, jobs, color } = state;

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      dispatch(addJob(e.target.value));
    }
  };

  return (
    <>
      {/* <div style={{ padding: "0 20px" }}>
        <h3>Todo app</h3>
        <input
          type="text"
          placeholder="Enter todo"
          value={job}
          onChange={(e) => dispatch(setJob(e.target.value))}
          onKeyDown={(e) => onKeyDownHandler(e)}
        />
        <button onClick={() => dispatch(addJob(job))}>Add</button>

        <ul>
          {jobs.map((item, index) => (
            <li key={index}>
              {item}{" "}
              <span
                style={{ cursor: "pointer", color: color }}
                onClick={() => dispatch(deleteJob(index))}
              >
                x
              </span>
            </li>
          ))}
        </ul>
      </div> */}
    
        <div style={{ backgroundColor:"red", width:"400px"}}> 
        <ul style={{ display:"flex", listStyle:"none"}}>
          <li style={{padding : "10px", }}><Link to="/counter">Counter</Link></li>
          <li style={{padding : "10px"}}><Link to="/todo">Todo</Link></li>
          <li style={{padding : "10px"}}><Link to="/bai2">bai2</Link></li>
        </ul>
        </div>
    </>
  );
};

export default TodoApp;
