import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../store";
import {postsActions} from "../../store/posts.slice.ts";
import {bindActionCreators} from "@reduxjs/toolkit";


export const useAppSelector:TypedUseSelectorHook<RootStateType>=useSelector
const actions={
    ...postsActions
}


export const useActions=()=>{
    const dispatch=useDispatch()
    return bindActionCreators(actions,dispatch)
}
