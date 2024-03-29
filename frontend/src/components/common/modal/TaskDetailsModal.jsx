import React, { useState, useEffect } from "react";
import "./TaskDetailsModal.css";
import Button from "../Button/Button";
import editIcon from "../../../assets/icons/editIcon.svg";

const TaskDetailsModal = ({ isOpen, onClose, task, onEditTaskSubmit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });
    const [historyLogs, setHistoryLogs] = useState([]);

    useEffect(() => {
        if (!isOpen) {
            setIsEditing(false);
            setEditedTask({ ...task });
        }
    }, [isOpen, task]);

    useEffect(() => {
        if (isOpen && task.taskId) {
            fetch(`http://localhost:3001/activity-logs?taskId=${task.taskId}`)
                .then((response) => response.json())
                .then((data) => setHistoryLogs(data.reverse()))
                .catch((error) =>
                    console.error("Error loading task history logs:", error)
                );
        }
    }, [isOpen, task.taskId, task]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isOpen && !event.target.closest(".details-modal-content")) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        await onEditTaskSubmit(editedTask);
        setIsEditing(false);
    };

    return (
        <div className="details-modal-overlay" onClick={onClose}>
            <div
                className="details-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="task-details">
                    <div className="task-info">
                        <div className="task-info-header">
                            {!isEditing ? (
                                <>
                                    <h2>{task.taskName}</h2>
                                    <Button
                                        icon={editIcon}
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit task
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        name="taskName"
                                        value={editedTask.taskName}
                                        onChange={handleChange}
                                        autoFocus
                                    />
                                    <Button onClick={handleSave}>Save</Button>
                                </>
                            )}
                        </div>
                        {isEditing ? (
                            <>
                                <div className="task-info-row">
                                    <label htmlFor="dueDate">Due date:</label>
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={editedTask.dueDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="task-info-row">
                                    <label htmlFor="priority">Priority:</label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={editedTask.priority}
                                        onChange={handleChange}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div className="task-info-row">
                                    <label htmlFor="taskDescription">
                                        Description:
                                    </label>
                                    <textarea
                                        id="taskDescription"
                                        name="taskDescription"
                                        value={editedTask.taskDescription}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="task-info-row">
                                    <div className="task-label">Due date:</div>
                                    <div className="task-value">
                                        {task.dueDate}
                                    </div>
                                </div>
                                <div className="task-info-row">
                                    <div className="task-label">Priority:</div>
                                    <div className="task-value">
                                        {task.priority}
                                    </div>
                                </div>
                                <h3>Description</h3>
                                <p>{task.taskDescription}</p>
                            </>
                        )}
                    </div>
                    <div className="history-section">
                        <ul>
                            {historyLogs.map((log) => (
                                <li key={log.id}>
                                    <p>{log.description}</p>
                                    <small>
                                        {new Date(log.timestamp).toLocaleString(
                                            "en-US",
                                            {
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            }
                                        )}
                                    </small>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button className="details-close-modal" onClick={onClose}>
                    ✕
                </button>
            </div>
        </div>
    );
};

export default TaskDetailsModal;
