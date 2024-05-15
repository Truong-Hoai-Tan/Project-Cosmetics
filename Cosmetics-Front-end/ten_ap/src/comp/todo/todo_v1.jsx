import React, { useReducer, useState } from "react";

const TodoAppV1 = (props) => {
    const [job, setJob] = useState("")
    const [jobs, setJobs] = useState(["Rửa bát", "Quét nhà"])

    const addJob = (job) => {
        setJobs([...jobs, job])
        setJob("")
    }

    const deleteJob = (index) => {
        let newJobs = [...jobs]
        newJobs.splice(index, 1)
        setJobs(newJobs)
    } 

    const onKeyDownHandler = (e) => {
       if (e.keyCode === 13) {
        addJob(e.target.value)
       }
    }

    return <>
        <div style={{padding: '0 20px'}}>
             <h3>Todo app</h3>
            <input type="text"
                placeholder="Enter todo" 
                value={job} 
                onChange={(e) =>  setJob(e.target.value) } 
                onKeyDown={(e) => onKeyDownHandler(e)}
              />
            <button onClick={() => addJob(job)}>Add</button>

            <ul>
                {jobs.map((item, index) => (
                    <li key={index}>{item} <span style={{cursor: 'pointer'}} onClick={() => deleteJob(index)}>x</span></li>
                ))}
            </ul>
        </div>
    </>
}


export default TodoAppV1
