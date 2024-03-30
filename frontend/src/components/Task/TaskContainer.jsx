import Task from "./Task";
import React, { useState } from "react";

const TaskContainer = ({ taskId, onMoveTask, ...props }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleMoveTask = (newListId) => {
        onMoveTask(taskId, newListId);
    };

    return (
        <Task
            {...props}
            taskId={taskId}
            isModalOpen={isModalOpen}
            onOpenModal={handleOpenModal}
            onCloseModal={handleCloseModal}
            onMoveTask={handleMoveTask}
        />
    );
};

export default TaskContainer;
