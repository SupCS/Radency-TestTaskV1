import React, { useState } from "react";
import "./List.css";
import TaskForm from "../common/taskform/TaskForm.jsx";
import Task from "../Task/Task";
import Button from "../common/Button/Button.jsx";
import plusIconLight from "../../assets/icons/plusIconLight.svg";
import Modal from "../common/modal/CreateTaskModal.jsx";
import KebabMenu from "../common/KebabMenu/KebabMenu.jsx";

const List = ({
    id,
    title,
    tasks,
    onAddTask,
    onUpdateTitle,
    onDeleteList,
    onMoveTask,
    taskLists,
    onEditTaskSubmit,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleChangeTitle = (e) => {
        setNewTitle(e.target.value);
    };

    const handleBlur = () => {
        onUpdateTitle(id, newTitle);
        setIsEditing(false);
    };

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
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={handleChangeTitle}
                        onBlur={handleBlur}
                        autoFocus
                    />
                ) : (
                    <h2
                        className="column-title"
                        onDoubleClick={handleDoubleClick}
                    >
                        {title}
                    </h2>
                )}
                <KebabMenu>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDeleteList(id)}>Delete</button>
                </KebabMenu>
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
                        key={task.id}
                        taskId={task.id}
                        taskName={task.taskName}
                        taskDescription={task.taskDescription}
                        dueDate={task.dueDate}
                        priority={task.priority}
                        taskLists={taskLists.filter((list) => list.id !== id)} // Виключаємо поточний список з опцій переміщення
                        onMoveTask={(taskId, newListId) =>
                            onMoveTask(taskId, newListId)
                        }
                        onEditTaskSubmit={onEditTaskSubmit}
                    />
                ))}
            </div>
        </div>
    );
};

export default List;
