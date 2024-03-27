import "./App.css";
import plusIconLight from "./assets/icons/plusIconLight.svg";
import historyIcon from "./assets/icons/historyIcon.svg";
import Button from "./components/common/Button/Button";
import List from "./components/List/List";
import React, { useState, useEffect } from "react";

function App() {
    const [taskLists, setTaskLists] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        fetch("http://localhost:3001/task-lists")
            .then((response) => response.json())
            .then((data) => setTaskLists(data))
            .catch((error) => console.error("Error fetching data:", error));
    };

    const addTask = async (taskListId, task) => {
        try {
            const response = await fetch("http://localhost:3001/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...task, taskListId }),
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            // Оновлення списку завдань після додавання нового завдання
            fetchTasks();
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                {/* <Button icon={historyIcon}>Кнопка</Button> */}
                <Button icon={plusIconLight} dark>
                    New list
                </Button>
                <div className="columns-wrapper">
                    {taskLists.map((list) => (
                        <List
                            key={list.id}
                            id={list.id}
                            title={list.name}
                            tasks={list.tasks || []}
                            onAddTask={addTask}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
