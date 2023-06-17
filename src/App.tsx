import './App.css'
import {useGetPostsMutation} from "./api/postApi.ts";
import {useEffect, useState} from "react";
import Post from "./components/Post.tsx";
import {IResponsePost} from "./interfaces/posts.ts";
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [getPosts] = useGetPostsMutation()
    const [lastPostId, setLastPostId] = useState(0);
    const [posts, setPosts] = useState<IResponsePost[]>([]);
    const [direction, setDirection] = useState<'new'|'old'>('new');

    useEffect(() => {
        getPosts(lastPostId).unwrap().then(res => {
            const id = res.posts?.at(-1)?.id
            setPosts(res.posts)
            id && setLastPostId(id)
        }).catch(e => {
            console.log(e)
        })
    }, []);
    const postsSort = () => {
        setDirection(prevState => prevState==='new'?'old':'new')
        setPosts([...posts].reverse())
    }
        useEffect(()=>{
          const intervalId=setInterval(()=>{
              getPosts(lastPostId).unwrap().then(res=>{
                  setPosts(prevState => {
                       setLastPostId(prevIndex=>{
                           return res.posts?.at(-1)?.id ?? prevIndex
                       })
                      return direction==='new'? [...res.posts,...prevState]:[...prevState,...res.posts]
                  })
              })

          },5000)
            return ()=>{
              clearInterval(intervalId)
            }
        },[getPosts,lastPostId])

    return (
        <div className={'mx-auto w-fit p-[30px] max-w-full'}>
            <h1 className={'w-fit mx-auto text-6xl mb-5'}>IActive</h1>
            <select onChange={postsSort} className={'outline-none mb-[10px]'}>
                <option>Сначала новые</option>
                <option>Сначала старые</option>
            </select>
            {posts.map(({date, author, senderNumber, content, channel, id, region, attachments}) => <Post
                key={uuidv4()}
                author={author} content={content} channel={channel} id={id} date={date} attachments={attachments}
                senderNumber={senderNumber} region={region}/>)}
        </div>
    )
}

export default App
