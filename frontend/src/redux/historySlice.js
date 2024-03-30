import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as historyService from "../services/historyService";

export const fetchHistory = createAsyncThunk(
    "history/fetchHistory",
    async (_, { rejectWithValue }) => {
        try {
            const historyLogs = await historyService.fetchHistoryLogs();
            return historyLogs.reverse();
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

export const fetchTaskHistory = createAsyncThunk(
    "history/fetchTaskHistory",
    async (taskId, { rejectWithValue }) => {
        try {
            const historyLogs = await historyService.fetchHistoryLogsForTask(
                taskId
            );
            return historyLogs.reverse();
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

export const clearHistory = createAsyncThunk(
    "history/clearHistory",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            await historyService.clearHistoryLogs();
            dispatch(fetchHistory());
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

const historySlice = createSlice({
    name: "history",
    initialState: {
        logs: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHistory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.logs = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchHistory.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(fetchTaskHistory.fulfilled, (state, action) => {
                state.logs = action.payload;
                state.status = "succeeded";
            });
    },
});

export default historySlice.reducer;
