import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import listsReducer from "./listsSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        lists: listsReducer,
    },
});
