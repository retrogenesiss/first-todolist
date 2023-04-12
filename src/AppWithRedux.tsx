import React from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
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
} from "./state/todolists-reduсer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
// export type TasksStateType = {
//     [key: string]: Array<TasksType>
// }

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>( state => state.todolists )

    function changeFilter(todolistId: string, value: FilterValuesType) {
        const action = changeFilterAC(todolistId, value)
        dispatch(action)
    }

    let removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    let changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
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

                            return <Grid item>
                                <Paper style={ {padding: '10px'} }>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
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

export default AppWithRedux;

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