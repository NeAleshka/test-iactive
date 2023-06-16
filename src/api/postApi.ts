import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IResponse} from "../interfaces/posts.ts";

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://a0830433.xsph.ru' }),
    endpoints: (builder) => ({
        getPosts: builder.mutation({
            query: (messageId) => {
                const formData = new FormData();
                formData.append('actionName', 'MessagesLoad');
                formData.append('messageId', messageId.toString());
                return {
                    url: '/',
                    method: 'POST',
                    body: formData,
                };
            },
            transformResponse:(res:IResponse)=> {
                return{
                    posts:[...res.Messages]
                }
            },
        }),
    }),
});

export const { useGetPostsMutation } = postsApi;
