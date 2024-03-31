import Task from "./Task";
import React, { useState } from "react";

const TaskContainer = ({
    taskId,
    onMoveTask,
    taskName,
    taskDescription,
    ...props
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleMoveTask = (newListId) => {
        onMoveTask(taskId, newListId);
    };

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    }

    const truncatedTaskName = truncateText(taskName, 40);
    const truncatedTaskDescription = truncateText(taskDescription, 100);

    return (
        <Task
            {...props}
            taskName={taskName}
            taskDescription={taskDescription}
            taskId={taskId}
            isModalOpen={isModalOpen}
            onOpenModal={handleOpenModal}
            onCloseModal={handleCloseModal}
            onMoveTask={handleMoveTask}
            truncatedTaskName={truncatedTaskName}
            truncatedTaskDescription={truncatedTaskDescription}
        />
    );
};

export default TaskContainer;
