import {TasksStateType} from "../PrevComponents/App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reduсer";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TsarType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // const stateCopy = {...state};
            // const tasks = state[action.payload.todoListId];
            // const filteredTasks = tasks.filter(t => t.id !== action.payload.taskId)
            // stateCopy[action.payload.todoListId] = filteredTasks
            return {
                ...state,
                [action.payload.todoListId]:
                    state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            // const stateCopy = {...state};
            // const tasks = stateCopy[action.payload.todoListId]
            let newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            // const newTasks = [newTask, ...tasks]
            // stateCopy[action.payload.todoListId] = newTasks
            return {
                ...state,
                [action.payload.todoListId]:
                    [newTask, ...state[action.payload.todoListId]]
            }
        }
        case 'CHANGE-STATUS': {
            // const stateCopy = {...state};
            // let tasks = stateCopy[action.payload.todoListId]
            // stateCopy[action.payload.todoListId] = tasks.map(el => el.id === action.payload.taskId
            //     ? {...el, isDone: action.payload.isDone} : el)
            return {
                ...state,
                [action.payload.todoListId]:
                    state[action.payload.todoListId].map(el => el.id === action.payload.taskId
                        ? {...el, isDone: action.payload.isDone} : el)
            }
        }
        case 'CHANGE-TITLE': {
            // const stateCopy = {...state};
            // let tasks = stateCopy[action.payload.todoListId]
            // let task = tasks.find(t => t.id === action.payload.taskId)
            // if (task) {
            //     task.title = action.payload.title
            // }
            return {
                ...state,
                [action.payload.todoListId]:
                    state[action.payload.todoListId].map(el => el.id === action.payload.taskId
                        ? {...el, title: action.payload.title} : el)
            }
        }
        case 'ADD-TODOLIST': {
            // const stateCopy = {...state};
            // stateCopy[action.payload.todolistId] = []
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.payload.id]
            return stateCopy
        }
        default:
            return state
    }
}

type TsarType = RemoveTaskACType
    | AddTaskACType
    | ChangeStatusACType
    | ChangeTitleACType
    | AddTodolistACType
    | RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId, todoListId
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todoListId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title, todoListId
        }
    } as const
}

type ChangeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (taskId: string, isDone: boolean, todoListId: string) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            taskId, isDone, todoListId
        }
    } as const
}

type ChangeTitleACType = ReturnType<typeof changeTitleAC>
export const changeTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {
        type: 'CHANGE-TITLE',
        payload: {
            taskId, title, todoListId
        }
    } as const
}
