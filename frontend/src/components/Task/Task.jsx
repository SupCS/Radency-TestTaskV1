import React from "react";
import "./Task.css";
import calendarIcon from "../../assets/icons/calendarIcon.svg";

const Task = ({
    taskName,
    taskDescription,
    dueDate,
    priority,
    taskLists,
    onMoveTask,
    taskId,
}) => {
    const priorityText = (priority) => {
        switch (priority) {
            case "low":
                return "Low";
            case "medium":
                return "Medium";
            case "high":
                return "High";
            default:
                return "Not stated";
        }
    };

    const handleMoveTask = (newListId) => {
        onMoveTask(taskId, newListId);
    };

    const formatDate = (dateString) => {
        const options = { weekday: "short", day: "numeric", month: "short" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <div className={`task-card`}>
            <h3 className="task-title">{taskName}</h3>
            <p className="task-description">{taskDescription}</p>
            <div className="task-metadata">
                <img
                    src={calendarIcon}
                    className="calendar-icon"
                    alt="calendar icon"
                ></img>
                <span className="task-date">{formatDate(dueDate)}</span>
            </div>
            <div className={`task-priority ${priority}`}>
                <span className="priority-circle"></span>
                <span className="priority-text">{priorityText(priority)}</span>
            </div>
            <select onChange={(e) => handleMoveTask(e.target.value)}>
                <option value="">Move to:</option>
                {taskLists.map((list) => (
                    <option key={list.id} value={list.id}>
                        {list.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Task;
