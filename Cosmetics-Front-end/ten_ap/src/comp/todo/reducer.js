import { ADD_JOB, DELETE_JOB, SET_JOB } from "./constant";

 // 1. Init state
 export const initState = {
    job: "",
    jobs: [], 
    color: 'red'
}

// 3. Viết reducer ứng với các action bên trên
const reducer = (state, action) => {
    let newState
    switch(action.type) {
        case SET_JOB: 
            newState = {
                ...state, 
                job: action.payload
            }
            break;

        case ADD_JOB: 
            newState = {
                ...state, 
                job: '',
                jobs: [...state.jobs,  action.payload]
            }
            break;

        case DELETE_JOB: 
            let newJobs = [...state.jobs]
            newJobs.splice(action.payload, 1)
            newState = {
                ...state, 
                jobs: newJobs
            }
            break;

        default:
            throw new Error("Invalid action");
    }

    return newState
}

export default reducer