import { useState, useEffect } from "react";
// import './App.css'
import axios from "axios";

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        axios
        .get("https://taskmanager-wmy6.onrender.com/api/tasks/")
        .then((response) => setTasks(response.data))
        .then((err) => console.log(err));
    }, []);


    const addTask = () => {
        if (!newTask) {
            alert("Please enter a task");
            return
        };
        axios
        .post("https://taskmanager-wmy6.onrender.com/api/tasks/", {title: newTask,completed : false})
        .then((response) => setTasks([...tasks, response.data]))
        .catch((err)=>{
            if (err.response && err.response.status === 400) {
                alert("Error: " + (err.response.data.title || "Invalid request"));
            }else{
                alert("An error occurred. Please try again.");
            }
        })
        setNewTask("");
            
    };

    const markCompleted = (id) => {
        axios
        .patch(`https://taskmanager-wmy6.onrender.com/api/tasks/${id}/`, {completed: true})
        .then(() => setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task)))
        .then((err) => console.log(err));
    };

  return (
    <div className="p-4 text-center">
        <h1 className="text-2xl font-bold pb-4">Task Manager</h1>
        <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New Task" className="border p-2" />
        <button onClick={addTask} className="bg-blue-500 text-white p-2 ml-2">Add Task</button>
        <br />
        <p className="inline mt-4">Total Task Added- <b>{tasks.length}</b></p>
        <ul className="mt-4 h-80 overflow-y-scroll align-left">
            {tasks.map(task => (
                <li key={task.id} className={`p-2 ${task.completed ? "line-through text-red-500" : "text-blue-500"}`}>
                    {task.title}
                    {!task.completed && <button onClick={() => markCompleted(task.id)} className="ml-2 bg-green-500 text-white p-1">Done</button>}
                </li>
            ))}
        </ul>
    </div>
  );
}

export default App;
