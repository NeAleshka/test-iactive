import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {postsApi} from "../api/postApi.ts";
import {postsReducers} from "./posts.slice.ts";

export const store=configureStore({
    reducer:{
        [postsApi.reducerPath]:postsApi.reducer,
        posts:postsReducers,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(postsApi.middleware)
})

export type RootStateType=ReturnType<typeof store.getState>

setupListeners(store.dispatch)
