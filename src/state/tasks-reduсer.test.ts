import {TasksStateType} from "../PrevComponents/App";
import {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC, tasksReducer} from "./tasks-reduсer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reduсer";

test('correct task should be removed from correct array', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Chocolate", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, removeTaskAC('2', 'todoListId2'))

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(2)
    expect(endState['todoListId2'].every(t => t.id != '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Chocolate", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, addTaskAC('Juice', 'todoListId2'))

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(4)
    expect(endState['todoListId2'][0].id).toBeDefined()
    expect(endState['todoListId2'][0].title).toBe('Juice')
    expect(endState['todoListId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Chocolate", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, changeStatusAC('2', false, 'todoListId2'))

    expect(endState['todoListId2'][1].isDone).toBeFalsy()
    expect(endState['todoListId1'][1].isDone).toBeTruthy()
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Chocolate", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, changeTitleAC('2', 'Milkyway', 'todoListId2'))

    expect(endState['todoListId2'][1].title).toBe('Milkyway')
    expect(endState['todoListId1'][1].title).toBe("JS")
})

test('new property should be added in added todolist', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Chocolate", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, addTodolistAC('new todolist',))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todoListId1' && k != 'todoListId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: true},
            {id: '3', title: "Chocolate", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, removeTodolistAC('todoListId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListId2']).not.toBeDefined()
})