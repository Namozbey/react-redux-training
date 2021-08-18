import {SET_TODOS, ADD_TODO, REMOVE_TODO, CHANGE_STATUS } from "../actions/todos/todosTypes";

const INITIAL_STATE = [{
    userId: 0,
    id: 0,
    title: "",
    status: ""
}]

export default function todosReducer(state = INITIAL_STATE, {payload, type}) {
    switch(type){
        case SET_TODOS: 
            return payload;
        case ADD_TODO: 
            return [
                ...state,
                {
                    userId: new Date().getTime(),
                    id: new Date().getTime()*2,
                    title: payload.title,
                    status: "new"
                }
            ]
        case REMOVE_TODO: 
            return state.filter((el) => el.id !== payload.id);
        case CHANGE_STATUS: 
            return state.map((el) => el.id === payload.id ? {...el, status: payload.status} : el)
        default:
            return state
    }
}
