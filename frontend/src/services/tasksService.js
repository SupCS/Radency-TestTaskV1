const API_URL = "http://localhost:3001/tasks";

export const fetchTasks = () => {
    return fetch(API_URL).then((response) => response.json());
};

export const addTask = (task) => {
    return fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    }).then((response) => response.json());
};

export const deleteTask = (taskId) => {
    return fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to delete task");
        }
    });
};

export const updateTask = (taskId, editedTask) => {
    return fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
    }).then((response) => response.json());
};

export const moveTaskToList = (taskId, newListId) => {
    return fetch(`${API_URL}/${taskId}/move`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskListId: newListId }),
    }).then((response) => response.json());
};
