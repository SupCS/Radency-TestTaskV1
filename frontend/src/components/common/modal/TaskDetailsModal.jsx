import React, { useState, useEffect } from "react";
import "./TaskDetailsModal.css";
import Button from "../Button/Button";

const TaskDetailsModal = ({ isOpen, onClose, task, onEditTaskSubmit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    useEffect(() => {
        if (!isOpen) {
            setIsEditing(false);
            setEditedTask({ ...task });
        }
    }, [isOpen, task]);

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
                            <h2>{task.taskName}</h2>
                            {!isEditing ? (
                                <Button onClick={() => setIsEditing(true)}>
                                    Edit task
                                </Button>
                            ) : (
                                <Button onClick={handleSave}>Save</Button>
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
                                <p>Due date: {task.dueDate}</p>
                                <p>Priority: {task.priority}</p>
                                <h3>Description</h3>
                                <p>{task.taskDescription}</p>
                            </>
                        )}
                    </div>
                    <div className="history-section"></div>
                </div>
                <button className="details-close-modal" onClick={onClose}>
                    ✕
                </button>
            </div>
        </div>
    );
};

export default TaskDetailsModal;
