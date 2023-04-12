import React, {useReducer} from 'react';
import '../App.css';
import {TasksType, Todolist} from "../Todolist";
import {AddItemForm} from "../AddItemForm";
import {v1} from "uuid";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "../state/todolists-reduсer";
import {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC, tasksReducer} from "../state/tasks-reduсer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithReducers() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todolists, dispatchTodolistsReduces] = useReducer(todolistsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]);

    let [tasksObj, dispatchTaskReducer] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Chocolate", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Eggs", isDone: true}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchTaskReducer(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatchTaskReducer(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeStatusAC(taskId, isDone, todolistId)
        dispatchTaskReducer(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = changeTitleAC(taskId, newTitle, todolistId)
        dispatchTaskReducer(action)
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        const action = changeFilterAC(todolistId, value)
        dispatchTodolistsReduces(action)
    }

    let removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchTodolistsReduces(action)
        dispatchTaskReducer(action)
    }

    let changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatchTodolistsReduces(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchTodolistsReduces(action)
        dispatchTaskReducer(action)
    }

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Menu
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={ {padding: '10px'} }>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasksObj[tl.id];

                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone); // t.isDone === true
                            }
                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone); // t.isDone === false
                            }
                            return <Grid item>
                                <Paper style={ {padding: '10px'} }>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        // tasks={tasksForTodolist}
                                        // removeTask={removeTask}        // коллбэк
                                        changeFilter={changeFilter}    // коллбэк
                                        // addTask={addTask}
                                        // changeTaskStatus={changeStatus}
                                        // changeTaskTitle={changeTaskTitle}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;

////////////////////////////////////////////////////////////////////////////////////////////////////

// let initTasks = [
//     {id: 1, title: "CSS", isDone: true},
//     {id: 2, title: "JS", isDone: true},
//     {id: 3, title: "React", isDone: false}
// ]

// let arr = useState(initTasks);

// let tasks = arr[0];
// let setTasks = arr[1];

// let [tasks, setTasks] = useState<Array<TasksType>>([
//     {id: v1(), title: "CSS", isDone: true},
//     {id: v1(), title: "JS", isDone: true},
//     {id: v1(), title: "ReactJS", isDone: false},
//     {id: v1(), title: "Rest API", isDone: false},
//     {id: v1(), title: "GraphQL", isDone: false}
// ]);

// let [filter, setFilter] = useState<FilterValuesType>("all")  // нужно создать FilterValuesType, чтобы не ошибиться в написании


// function  changeStatus(taskId: string) {
//     let task = tasks.find( (t) => {
//         if (t.id === taskId) {
//             return true;
//         }
//         else {
//             return false;
//         }
//     } )
// }

//     let resultTask = tasks.filter( (t) => {
//         if (t.id !== id) {                          // можно просто укоротить, так как есть оператор
//             return true;                            // + ф-ция не делает ничего, кроме return
//         } else {
//             return false;
//         }
//     } )
// }

// let tasks2 = [
//     { id: 1, title: "The Thing", isDone: true },
//     { id: 2, title: "Drifters", isDone: false },
//     { id: 3, title: "Alien", isDone: true }
// ]