import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./PrevComponents/App";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC} from "./state/tasks-reduсer";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TasksType>>( state => state.tasks[props.id] )

    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle)

    const onAllClickHandler = () => props.changeFilter(props.id, "all")
    const onActiveClickHandler = () => props.changeFilter(props.id, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")

    let tasksForTodolist = tasks;

    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }

    return (
        <div>
            <h3>
                <EditableSpan
                    title={props.title}
                    onChange={changeTodolistTitle}
                />
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={(title) => dispatch(addTaskAC(title, props.id))}/>

            <div>
                {
                    tasksForTodolist.map(t => {
                    const onRemoveHandler = () => dispatch(removeTaskAC(t.id, props.id))
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIdDoneValue = e.currentTarget.checked
                        dispatch(changeStatusAC(t.id, newIdDoneValue, props.id))
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        dispatch(changeTitleAC(t.id, newValue, props.id))
                    }

                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox checked={t.isDone}
                                  onChange={onChangeStatusHandler}/>
                        {/*<span>{t.title}</span>*/}
                        <EditableSpan title={t.title}
                                      onChange={onChangeTitleHandler}
                        />
                        <IconButton onClick={onRemoveHandler}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                })}
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"}
                        variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"}
                        variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

//////////////////////////////////////////////////////////////////////////////////////////////////

// let [title, setTitle] = useState("");
// let [error, setError] = useState<string | null>(null);

// const addTask = () => {
//     // if (props.title.trim() === ''){
//     //     return;
//     // }
//     // // функция обрыва
//     // props.addTask(props.title.trim());
//     // setTitle('');
//     if (title.trim() !== '') {
//         props.addTask(title.trim(), props.id);
//         setTitle("");
//     } else {
//         setError('Title is required');
//     }
// }

// const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.currentTarget.value)  // currentTarget - это тот эл., с которым произошло событие
// }
// const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//     setError(null);
//     if (e.charCode === 13) {                 // если нужно нажать две клавиши, то
//         addTask()                            // e.ctrlKey && e.charCode
//     }
// }

// <input value={title}
//                        onChange={onChangeHandler}
//                        onKeyPress={onKeyPressHandler}
//                        className={error ? 'error' : ''}  // псевдоложь
//                 />
//                 <button onClick={addTask}>+</button>
//                 {error && <div className='error-message'>{error}</div>}

// props.tasks.map( t =>
// <li>
// <input type="checkbox" checked={t.isDone}/>
// <span>{t.title}</span>
// </li>
//)
//можно убрать фигурные скобки и return, если ф-ция ничего иного не делает