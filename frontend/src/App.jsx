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

    const updateTitle = async (listId, newName) => {
        try {
            const response = await fetch(
                `http://localhost:3001/task-lists/${listId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: newName }),
                }
            );

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            fetchTasks();
        } catch (error) {
            console.error("Failed to update list title:", error);
        }
    };

    const addNewList = async () => {
        const newListName = "New list"; // Стандартна назва для нового списку
        try {
            const response = await fetch("http://localhost:3001/task-lists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newListName }),
            });

            if (!response.ok) {
                throw new Error("Could not create new list");
            }

            fetchTasks();
        } catch (error) {
            console.error("Failed to add new list:", error);
        }
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
                <Button icon={plusIconLight} dark onClick={addNewList}>
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
                            onUpdateTitle={updateTitle}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
