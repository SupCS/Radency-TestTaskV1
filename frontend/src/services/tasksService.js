const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

export const fetchTasks = () => {
    return fetch(`${API_URL}/tasks`).then((response) => response.json());
};

export const addTask = (task) => {
    return fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    }).then((response) => response.json());
};

export const deleteTask = (taskId) => {
    return fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to delete task");
        }
    });
};

export const updateTask = (taskId, editedTask) => {
    return fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
    }).then((response) => response.json());
};

export const moveTaskToList = (taskId, newListId) => {
    return fetch(`${API_URL}/tasks/${taskId}/move`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskListId: newListId }),
    }).then((response) => response.json());
};
