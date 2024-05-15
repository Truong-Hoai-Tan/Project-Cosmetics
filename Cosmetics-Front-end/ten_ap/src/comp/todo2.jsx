import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const calculation = (num) => {
    console.log("calculating....")
    for (let i = 0; i < 1000000000; i++) {
        num += i;
    }
    return num
}

const Todo2 = (props) => {
    const [count, setCount] = useState(0)
    const [todos, setTodos] = useState(["Rửa bát", "Quét nhà"])

    const calculationMemo = useMemo(() => calculation(count), [count])
    const buttonRef = useRef()
    const inscrement = () => {
        setCount(count + 1)
    }

    const addTodo = () => {
        setTodos((t) => [...t, "New todo..."])
    }

    useEffect(() => {
        console.log(document.getElementById("titleText"))
    }, [])
    console.log(buttonRef.current)

    return <>
        <h2 id="titleText">My Todos</h2>
        {todos.map((item, index) => (<p key={index}>{item}</p>))}
        <button ref={buttonRef} onClick={addTodo}>Add todo</button>

        <hr />
        <div>
            Count = {count}
            <button onClick={inscrement}>+</button>

            Calculation = {calculationMemo}
        </div>
        <div style={{ marginTop: "10px"}}>
        <Link to ="/">Todo</Link>
      </div>
    </>
}

export default Todo2;