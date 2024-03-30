import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (task, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3001/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });
            if (!response.ok) throw new Error("Failed to add task");
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId, { rejectWithValue }) => {
        try {
            await fetch(`http://localhost:3001/tasks/${taskId}`, {
                method: "DELETE",
            });
            return taskId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async (editedTask, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:3001/tasks/${editedTask.taskId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editedTask),
                }
            );
            if (!response.ok) throw new Error("Failed to update task");
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const moveTaskToList = createAsyncThunk(
    "tasks/moveTaskToList",
    async ({ taskId, newListId }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:3001/tasks/${taskId}/move`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ taskListId: newListId }),
                }
            );
            if (!response.ok) throw new Error("Failed to move task");
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        items: [],
        status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTask.fulfilled, (state, action) => {
                const listIndex = state.items.findIndex(
                    (list) => list.id === action.payload.taskListId
                );
                if (listIndex !== -1) {
                    state.items[listIndex].tasks.push(action.payload);
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items.forEach((list) => {
                    list.tasks = list.tasks.filter(
                        (task) => task.id !== action.payload
                    );
                });
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                console.log(state);
                const listIndex = state.items.findIndex(
                    (list) => list.id === action.payload.taskListId
                );
                if (listIndex !== -1) {
                    const taskIndex = state.items[listIndex].tasks.findIndex(
                        (task) => task.id === action.payload.id
                    );
                    if (taskIndex !== -1) {
                        state.items[listIndex].tasks[taskIndex] =
                            action.payload;
                    }
                }
            })
            .addCase(moveTaskToList.fulfilled, (state, action) => {
                state.items.forEach((list) => {
                    list.tasks = list.tasks.filter(
                        (task) => task.id !== action.payload.id
                    );
                });
                const newListIndex = state.items.findIndex(
                    (list) => list.id === action.payload.newListId
                );
                if (newListIndex !== -1) {
                    state.items[newListIndex].tasks.push(action.payload);
                }
            });
    },
});

export default tasksSlice.reducer;
