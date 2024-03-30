const API_URL = "http://localhost:3001/task-lists";

export const fetchLists = () => {
    return fetch(API_URL)
        .then((response) => {
            if (!response.ok) throw new Error("Server error!");
            return response.json();
        })
        .then((data) =>
            data.map((list) => ({
                ...list,
                tasks: list.tasks.sort((a, b) => a.id - b.id),
            }))
        );
};

export const addNewList = (newList) => {
    return fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newList),
    }).then((response) => {
        if (!response.ok) throw new Error("Failed to create new list");
        return response.json();
    });
};

export const deleteList = (listId) => {
    return fetch(`${API_URL}/${listId}`, {
        method: "DELETE",
    }).then((response) => {
        if (!response.ok) throw new Error("Failed to delete the list");
        return listId;
    });
};

export const updateListName = ({ listId, name }) => {
    return fetch(`${API_URL}/${listId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    }).then((response) => {
        if (!response.ok) throw new Error("Failed to update list name");
        return response.json();
    });
};
