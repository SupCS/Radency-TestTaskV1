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

    const deleteList = async (listId) => {
        try {
            const response = await fetch(
                `http://localhost:3001/task-lists/${listId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            fetchTasks();
        } catch (error) {
            console.error("Failed to delete list:", error);
        }
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

    const moveTask = async (taskId, newListId) => {
        try {
            const response = await fetch(
                `http://localhost:3001/tasks/${taskId}/move`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ taskListId: newListId }),
                }
            );

            if (!response.ok) {
                throw new Error("Could not move task");
            }

            fetchTasks(); // Оновлення списку завдань після переміщення
        } catch (error) {
            console.error("Failed to move task:", error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <Button icon={historyIcon}>History</Button>
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
                            onDeleteList={deleteList}
                            onMoveTask={moveTask}
                            taskLists={taskLists}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
