import React, { useState } from "react";
import List from "./List";

const ListContainer = ({
    id,
    title: initialTitle,
    tasks,
    onUpdateTitle,
    onDeleteList,
    onAddTask,
    onMoveTask,
    taskLists,
    onEditTaskSubmit,
    onDeleteTask,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(initialTitle);

    // Керування закриттям і відкриттям нового вікна
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Збереження нового таска
    const handleSaveTask = (taskData) => {
        onAddTask(id, taskData);
        handleCloseModal();
    };

    // Керування редагуванням назви
    const handleDoubleClick = () => setIsEditing(true);
    const handleChangeTitle = (e) => setNewTitle(e.target.value);
    const handleBlur = () => {
        onUpdateTitle(id, newTitle);
        setIsEditing(false);
    };

    return (
        <List
            id={id}
            title={newTitle}
            tasks={tasks}
            isEditing={isEditing}
            newTitle={newTitle}
            onDoubleClick={handleDoubleClick}
            onChangeTitle={handleChangeTitle}
            onBlur={handleBlur}
            isModalOpen={isModalOpen}
            onOpenModal={handleOpenModal}
            onCloseModal={handleCloseModal}
            onSaveTask={handleSaveTask}
            onDeleteList={onDeleteList}
            onMoveTask={onMoveTask}
            taskLists={taskLists}
            onEditTaskSubmit={onEditTaskSubmit}
            onDeleteTask={onDeleteTask}
        />
    );
};

export default ListContainer;
