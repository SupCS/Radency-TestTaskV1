import React from "react";
import "./TaskDetailsModal.css";
import Button from "../Button/Button";
import editIcon from "../../../assets/icons/editIcon.svg";

const TaskDetailsModal = ({
    isOpen,
    onClose,
    task,
    isEditing,
    editedTask,
    onToggleEdit,
    onChange,
    onSave,
    historyLogs,
}) => {
    if (!isOpen) return null;

    return (
        <div className="details-modal-overlay" onClick={onClose}>
            <div
                className="details-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="task-details">
                    <div className="task-info">
                        <div className="task-info-header">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="taskName"
                                        value={editedTask.taskName}
                                        onChange={onChange}
                                        autoFocus
                                    />
                                    <Button onClick={onSave}>Save</Button>
                                </>
                            ) : (
                                <>
                                    <h2>{task.taskName}</h2>
                                    <Button
                                        icon={editIcon}
                                        onClick={onToggleEdit}
                                    >
                                        Edit task
                                    </Button>
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
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="task-info-row">
                                    <label htmlFor="priority">Priority:</label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={editedTask.priority}
                                        onChange={onChange}
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
                                        onChange={onChange}
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
                        <h3>History</h3>
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
