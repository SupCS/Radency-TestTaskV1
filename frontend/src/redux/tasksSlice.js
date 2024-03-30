import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as tasksService from "../services/tasksService";

export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (task, { rejectWithValue }) => {
        try {
            const data = await tasksService.addTask(task);
            return data;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId, { rejectWithValue }) => {
        try {
            await tasksService.deleteTask(taskId);
            return taskId;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async ({ taskId, updatedTask }, { rejectWithValue }) => {
        console.log(taskId, updatedTask);
        try {
            const data = await tasksService.updateTask(taskId, updatedTask);
            return data;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

export const moveTaskToList = createAsyncThunk(
    "tasks/moveTaskToList",
    async ({ taskId, newListId }, { rejectWithValue }) => {
        try {
            const data = await tasksService.moveTaskToList(taskId, newListId);
            return data;
        } catch (error) {
            return rejectWithValue(error.toString());
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
