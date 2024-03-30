import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLists = createAsyncThunk(
    "lists/fetchLists",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3001/task-lists");
            if (!response.ok) throw new Error("Server error!");
            let data = await response.json();

            data = data.map((list) => ({
                ...list,
                tasks: list.tasks.sort((a, b) => a.id - b.id),
                // tasks: list.tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            }));

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addNewList = createAsyncThunk(
    "lists/addNewList",
    async (newList, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3001/task-lists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newList),
            });
            if (!response.ok) throw new Error("Failed to create new list");
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteList = createAsyncThunk(
    "lists/deleteList",
    async (listId, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:3001/task-lists/${listId}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) throw new Error("Failed to delete the list");
            return listId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateListName = createAsyncThunk(
    "lists/updateListName",
    async ({ listId, name }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:3001/task-lists/${listId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name }),
                }
            );
            if (!response.ok) throw new Error("Failed to update list name");
            const data = await response.json();
            return data;
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
