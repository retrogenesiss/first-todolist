import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import './App.css';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TasksType> //TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addTask = () => {
        // if (props.title.trim() === ''){
        //     return;
        // }
        // // функция обрыва
        // props.addTask(props.title.trim());
        // setTitle('');
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Field is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)  // currentTarget - это тот эл., с которым произошло событие
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {                 // если нужно нажать две клавиши, то
            props.addTask(title);                // e.ctrlKey && e.charCode
            setTitle('');
        }
    }

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}  // псевдоложь
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onRemoveHandler = () => {props.removeTask(t.id)}
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })
                    // props.tasks.map( t =>
                    // <li>
                    // <input type="checkbox" checked={t.isDone}/>
                    // <span>{t.title}</span>
                    // </li>
                    //)
                    //можно убрать фигурные скобки и return, если ф-ция ничего иного не делает
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}