import React, { useState } from "react";
import plusIconLight from "./assets/icons/plusIconLight.svg";
import historyIcon from "./assets/icons/historyIcon.svg";
import Button from "./components/common/Button/Button";
import List from "./components/List/List";
import HistorySidebar from "./components/History/HistorySidebar";
import ScrollButtons from "./components/ScrollButtons/ScrollButtons";
import "./App.css";

function App({
    taskLists,
    status,
    error,
    onAddNewList,
    onUpdateTitle,
    onDeleteList,
    onAddTask,
    onDeleteTask,
    onUpdateTask,
    onMoveTask,
}) {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const toggleHistory = () => setIsHistoryOpen(!isHistoryOpen);

    if (status === "loading") return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="App">
            <div className="container">
                <div className="app-buttons-container">
                    <Button onClick={toggleHistory} icon={historyIcon}>
                        History
                    </Button>
                    <Button icon={plusIconLight} dark onClick={onAddNewList}>
                        New list
                    </Button>
                </div>
                <HistorySidebar
                    isOpen={isHistoryOpen}
                    onClose={() => setIsHistoryOpen(false)}
                />
                <div className="columns-wrapper">
                    {taskLists.map((list) => (
                        <List
                            key={list.id}
                            id={list.id}
                            title={list.name}
                            tasks={list.tasks || []}
                            onUpdateTitle={(newName) =>
                                onUpdateTitle(list.id, newName)
                            }
                            onDeleteList={() => onDeleteList(list.id)}
                            onAddTask={(listId, task) =>
                                onAddTask(listId, task)
                            }
                            onMoveTask={onMoveTask}
                            onEditTaskSubmit={onUpdateTask}
                            onDeleteTask={onDeleteTask}
                            taskLists={taskLists}
                        />
                    ))}
                </div>
            </div>
            <ScrollButtons
                scrollContainerSelector=".columns-wrapper"
                itemCount={taskLists.length}
            />
        </div>
    );
}

export default App;
