import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskHistory } from "../../../redux/historySlice";
import TaskDetailsModal from "./TaskDetailsModal";

const TaskDetailsModalContainer = ({
    isOpen,
    onClose,
    task,
    onEditTaskSubmit,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const dispatch = useDispatch();
    const { logs, status } = useSelector((state) => state.history);

    useEffect(() => {
        if (isOpen && task.taskId) {
            dispatch(fetchTaskHistory(task.taskId));
        }
    }, [isOpen, task.taskId, dispatch]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSave = () => {
        onEditTaskSubmit(editedTask);
        setIsEditing(false);
        onClose();
    };

    const handleToggleEdit = () => setIsEditing(!isEditing);

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

    return (
        <TaskDetailsModal
            isOpen={isOpen}
            onClose={onClose}
            task={task}
            isEditing={isEditing}
            editedTask={editedTask}
            onToggleEdit={handleToggleEdit}
            onChange={handleChange}
            onSave={handleSave}
            historyLogs={logs}
            status={status}
        />
    );
};

export default TaskDetailsModalContainer;
