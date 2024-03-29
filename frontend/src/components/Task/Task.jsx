import React, { useState } from "react";
import "./Task.css";
import calendarIcon from "../../assets/icons/calendarIcon.svg";
import TaskDetailsModal from "../common/modal/TaskDetailsModal";
import KebabMenu from "../common/KebabMenu/KebabMenu.jsx";
import Button from "../common/Button/Button.jsx";
import editIcon from "../../assets/icons/editIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

const Task = ({
    taskName,
    taskDescription,
    dueDate,
    priority,
    taskLists,
    onMoveTask,
    taskId,
    onEditTaskSubmit,
    onDeleteTask,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleMoveTask = (e, newListId) => {
        e.stopPropagation();
        onMoveTask(taskId, newListId);
    };

    const formatDate = (dateString) => {
        const options = { weekday: "short", day: "numeric", month: "short" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`task-card`} onClick={() => setIsModalOpen(true)}>
            <div className="task-header-container">
                <h3 className="task-title">{taskName}</h3>
                <KebabMenu>
                    <Button
                        icon={editIcon}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsModalOpen(true);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        icon={deleteIcon}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteTask(taskId);
                        }}
                    >
                        Delete
                    </Button>
                </KebabMenu>
            </div>
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
            <select
                onChange={(e) => handleMoveTask(e, e.target.value)}
                onClick={(e) => e.stopPropagation()}
            >
                <option value="">Move to:</option>
                {taskLists.map((list) => (
                    <option key={list.id} value={list.id}>
                        {list.name}
                    </option>
                ))}
            </select>
            <TaskDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                task={{ taskId, taskName, taskDescription, dueDate, priority }}
                onEditTaskSubmit={onEditTaskSubmit}
            />
        </div>
    );
};

export default Task;
