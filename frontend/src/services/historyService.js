const API_URL = "http://localhost:3001/activity-logs";

export const fetchHistoryLogs = () => {
    return fetch(API_URL).then((response) => response.json());
};

export const clearHistoryLogs = () => {
    return fetch(API_URL, { method: "DELETE" });
};

export const fetchHistoryLogsForTask = (taskId) => {
    const url = taskId ? `${API_URL}?taskId=${taskId}` : API_URL;
    return fetch(url).then((response) => response.json());
};
