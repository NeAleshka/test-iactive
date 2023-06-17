import {createSlice, PayloadAction} from '@reduxjs/toolkit'


const LS_FAV_POSTS_ID='favorites'

interface PostsState {
    favoritesPostsID:number[]
    direction:'new'|'old'
}

const initialState:PostsState={
    favoritesPostsID:JSON.parse(localStorage.getItem(LS_FAV_POSTS_ID)??'[]'),
    direction:'new',
}

const postsSlice=createSlice({
    name: 'postsSlice',
    reducers:{
        addToFavorites:(state, {payload}:PayloadAction<number>)=>{
            state.favoritesPostsID.push(payload)
            localStorage.setItem(LS_FAV_POSTS_ID,JSON.stringify(state.favoritesPostsID))
        },
        removeToFavorites:(state, {payload}:PayloadAction<number>)=>{
            state.favoritesPostsID=state.favoritesPostsID.filter(postID=>postID!==payload)
            localStorage.setItem(LS_FAV_POSTS_ID,JSON.stringify(state.favoritesPostsID))
        },

    },
    initialState
})

export const postsActions =postsSlice.actions
export const postsReducers =postsSlice.reducer
