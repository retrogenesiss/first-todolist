import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";  // не просто строка, а фикс. данные

function App() {
    // let initTasks = [
    //     {id: 1, title: "CSS", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "React", isDone: false}
    // ]

    // let arr = useState(initTasks);

    // let tasks = arr[0];
    // let setTasks = arr[1];

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all")  // нужно создать FilterValuesType, чтобы не ошибиться в написании

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

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

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let newTasks = [newTask, ...tasks];                // это деструктуризация массива. Позволяет
        setTasks(newTasks);                                // "доставать" элементы из одного массива
    }                                                      // и создавать с ними новый

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);  // я в тасках ищу таску, айди которой равно таскайди
        // task.isDone = !task.isDone
        if (task) {               // псевдоистина, псевдоложь. Проверяет, если таска существует
            task.isDone = isDone;
        }
        // let copy = [...tasks]  // нужно сделать "пересадку" в новый массив, чтобы реакт не вернул то же самое
        // setTasks(copy);
        setTasks([...tasks])
    }

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

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}        // коллбэк
                      changeFilter={changeFilter}    // коллбэк
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
            {/*<Todolist title="Movies" tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
