import React from "react";
import "./Task.css";
import calendarIcon from "../../assets/icons/calendarIcon.svg";
import DetailsModalContainer from "../common/modal/DetailsModalContainer";
import KebabMenu from "../common/KebabMenu/KebabMenu.jsx";
import Button from "../common/Button/Button.jsx";
import editIcon from "../../assets/icons/editIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { formatDate, priorityText } from "../../utils/tasksUtils.js";

const Task = ({
    taskId,
    taskName,
    taskDescription,
    dueDate,
    priority,
    taskLists,
    onMoveTask,
    onEditTaskSubmit,
    onDeleteTask,
    isModalOpen,
    onOpenModal,
    onCloseModal,
    truncatedTaskName,
    truncatedTaskDescription,
}) => {
    return (
        <div className="task-card" onClick={onOpenModal}>
            <div className="task-header-container">
                <h3 className="task-title">{truncatedTaskName}</h3>
                <KebabMenu>
                    <Button
                        icon={editIcon}
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenModal();
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
            <p className="task-description">{truncatedTaskDescription}</p>
            <div className="task-metadata">
                <img
                    src={calendarIcon}
                    className="calendar-icon"
                    alt="calendar icon"
                />
                <span className="task-date">{formatDate(dueDate)}</span>
            </div>
            <div className={`task-priority ${priority}`}>
                <span className="priority-circle"></span>
                <span className="priority-text">{priorityText(priority)}</span>
            </div>
            <select
                onChange={(e) => onMoveTask(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                defaultValue=""
            >
                <option value="" disabled>
                    Move to:
                </option>
                {taskLists.map((list) => (
                    <option key={list.id} value={list.id}>
                        {list.name}
                    </option>
                ))}
            </select>
            <DetailsModalContainer
                isOpen={isModalOpen}
                onClose={onCloseModal}
                task={{ taskId, taskName, taskDescription, dueDate, priority }}
                onEditTaskSubmit={(updatedTask) =>
                    onEditTaskSubmit({ ...updatedTask, taskId })
                }
            />
        </div>
    );
};

export default Task;
