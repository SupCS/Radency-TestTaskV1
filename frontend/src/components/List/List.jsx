import React, { useState } from "react";
import "./List.css";
import TaskForm from "../common/taskform/TaskForm.jsx";
import Task from "../Task/Task";
import Button from "../common/Button/Button.jsx";
import plusIconLight from "../../assets/icons/plusIconLight.svg";
import kebabIcon from "../../assets/icons/kebabIcon.svg";
import Modal from "../common/modal/Modal.jsx";

const List = ({ id, title, tasks, onAddTask }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveTask = (taskData) => {
        onAddTask(id, taskData);
        handleCloseModal();
    };

    return (
        <div className="column">
            <div className="column-header-container">
                <h2 className="column-title">{title}</h2>
                <button className="kebab-menu-button">
                    <img
                        className="kebab-icon"
                        src={kebabIcon}
                        alt="menu"
                    ></img>
                </button>
            </div>
            <Button icon={plusIconLight} dark onClick={handleOpenModal}>
                Add new task
            </Button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <TaskForm onSave={handleSaveTask} />
            </Modal>
            <div className="tasks-list">
                {tasks.map((task, index) => (
                    <Task
                        key={index}
                        taskName={task.taskName}
                        taskDescription={task.taskDescription}
                        dueDate={task.dueDate}
                        priority={task.priority}
                    />
                ))}
            </div>
        </div>
    );
};

export default List;
