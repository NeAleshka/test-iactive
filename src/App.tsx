import './App.css'
import {useGetPostsMutation} from "./api/postApi.ts";
import {useEffect, useState} from "react";
import Post from "./components/Post.tsx";
import {IResponsePost} from "./interfaces/posts.ts";

function App() {
    const [getPosts] = useGetPostsMutation()
    const lastPostId = localStorage.getItem('lastPostId') ?? 0
    const [posts, setPosts] = useState<IResponsePost[]>([]);
    useEffect(() => {
        getPosts(lastPostId).unwrap().then(res => {
            const id = res.posts?.at(-1)?.id
            setPosts(res.posts)
            id && localStorage.setItem('lastPostId', JSON.stringify(res.posts?.at(-1)?.id))
        }).catch(e => {
            console.log(e)
        })
    }, []);
    const postsSort = () => {
        setPosts([...posts].reverse())
    }
        useEffect(()=>{
          const intervalId=setInterval(()=>{
             localStorage.setItem('lastPostId',JSON.stringify(posts.at(-1)?.id))
              getPosts(lastPostId)
          },5000)
            return ()=>{
              clearInterval(intervalId)
            }
        },[getPosts])

    return (
        <div className={'mx-auto w-fit p-[30px] max-w-full'}>
            <h1 className={'w-fit mx-auto text-6xl mb-5'}>IActive</h1>
            <select onChange={postsSort} className={'outline-none mb-[10px]'}>
                <option>Сначала новые</option>
                <option>Сначала старые</option>
            </select>
            {posts.map(({date, author, senderNumber, content, channel, id, region, attachments}) => <Post
                key={id}
                author={author} content={content} channel={channel} id={id} date={date} attachments={attachments}
                senderNumber={senderNumber} region={region}/>)}
        </div>
    )
}

export default App
