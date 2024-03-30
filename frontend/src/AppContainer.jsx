// AppContainer.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import App from "./App";
import {
    fetchLists,
    addNewList,
    deleteList,
    updateListName,
} from "./redux/listsSlice";
import {
    addTask,
    deleteTask,
    updateTask,
    moveTaskToList,
} from "./redux/tasksSlice";

function AppContainer() {
    const dispatch = useDispatch();
    const {
        items: taskLists,
        status,
        error,
    } = useSelector((state) => state.lists);

    useEffect(() => {
        dispatch(fetchLists());
    }, [dispatch]);

    const handleAddNewList = () => dispatch(addNewList({ name: "New list" }));
    const handleUpdateTitle = (listId, newName) => {
        console.log(listId, newName);
        dispatch(updateListName({ listId, name: newName }));
    };
    const handleDeleteList = (listId) => dispatch(deleteList(listId));

    const handleAddTask = (listId, task) => {
        dispatch(addTask({ ...task, taskListId: listId })).then(() =>
            dispatch(fetchLists())
        );
    };
    const handleDeleteTask = (taskId) =>
        dispatch(deleteTask(taskId)).then(() => dispatch(fetchLists()));
    const handleUpdateTask = (editedTask) =>
        dispatch(updateTask(editedTask)).then(() => dispatch(fetchLists()));
    const handleMoveTask = (taskId, newListId) =>
        dispatch(moveTaskToList({ taskId, newListId })).then(() =>
            dispatch(fetchLists())
        );

    return (
        <App
            taskLists={taskLists}
            status={status}
            error={error}
            onAddNewList={handleAddNewList}
            onUpdateTitle={handleUpdateTitle}
            onDeleteList={handleDeleteList}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            onMoveTask={handleMoveTask}
        />
    );
}

export default AppContainer;
