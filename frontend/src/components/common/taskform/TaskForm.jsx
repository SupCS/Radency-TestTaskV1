import React, { useState } from "react";
import plusIconLight from "../../../assets/icons/plusIconLight.svg";
import Button from "../Button/Button";

const TaskForm = ({ onSave }) => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ taskName, taskDescription, dueDate, priority });
        // Очистка форми
        setTaskName("");
        setTaskDescription("");
        setDueDate("");
        setPriority("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <textarea
                placeholder="Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <Button icon={plusIconLight} dark>
                Темна кнопка
            </Button>
        </form>
    );
};

export default TaskForm;
