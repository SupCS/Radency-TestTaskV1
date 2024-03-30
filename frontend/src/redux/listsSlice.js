import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as listsService from "../services/listsService";
export const fetchLists = createAsyncThunk(
    "lists/fetchLists",
    async (_, { rejectWithValue }) => {
        try {
            return await listsService.fetchLists();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addNewList = createAsyncThunk(
    "lists/addNewList",
    async (newList, { rejectWithValue }) => {
        try {
            return await listsService.addNewList(newList);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteList = createAsyncThunk(
    "lists/deleteList",
    async (listId, { rejectWithValue }) => {
        try {
            return await listsService.deleteList(listId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateListName = createAsyncThunk(
    "lists/updateListName",
    async ({ listId, name }, { rejectWithValue }) => {
        try {
            return await listsService.updateListName({ listId, name });
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const listsSlice = createSlice({
    name: "lists",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLists.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchLists.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchLists.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addNewList.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteList.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload
                );
            })
            .addCase(updateListName.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (item) => item.id === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default listsSlice.reducer;
