const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

export const fetchHistoryLogs = () => {
    return fetch(`${API_URL}/activity-logs`).then((response) =>
        response.json()
    );
};

export const clearHistoryLogs = () => {
    return fetch(`${API_URL}/activity-logs`, { method: "DELETE" });
};

export const fetchHistoryLogsForTask = (taskId) => {
    const url = taskId
        ? `${API_URL}/activity-logs?taskId=${taskId}`
        : `${API_URL}/activity-logs`;
    return fetch(url).then((response) => response.json());
};
