import {TasksStateType, TodolistType} from "../../PrevComponents/App";
import {tasksReducer} from "../tasks-reduсer";
import {addTodolistAC, todolistsReducer} from "../todolists-reduсer";

test('ids should be equal', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')

    const endTaskState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTaskState);
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})

