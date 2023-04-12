import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reduсer";
import {todolistsReducer} from "./todolists-reduсer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store