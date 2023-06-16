import {IResponsePost} from "../interfaces/posts.ts";
import {UserLogo,Parameter,starGray,starBlue,Send,Window,defaultPostImg} from '../assets/images'
import {useActions, useAppSelector} from "../utils/hooks";
import {useState} from "react";


const Post = (props: IResponsePost) => {
    const {author, id, date, content, attachments} = props

    return (
        <li className={'p-[10px] rounded-[5px] w-full list-none border-2 mb-[10px] hover:scale-105 transform transition' +
            ' duration-300 ease-out hover:shadow-lg lg:w-[886px]'} key={id}>
            <PostHeader author={author} id={id} />
            <PostBody content={content} date={date} attachments={attachments}/>
            <PostFooter/>
        </li>
    );
};

export default Post;


const PostHeader = (props: Partial<IResponsePost>) => {
    const {author,id=''} = props
    const {addToFavorites,removeToFavorites}=useActions()
    const favoritesPosts=useAppSelector(state => state.posts.favoritesPostsID)
    const [isFavorite, setIsFavorite] = useState(Boolean(favoritesPosts.find(postId=>postId===id)))
    const addPostToFavorites=()=>{
        setIsFavorite(true)
        addToFavorites(id)
    }
    const removePostFromFavorites=()=>{
        setIsFavorite(false)
        removeToFavorites(id)
    }
    return (
        <div className={'w-full h-fit flex justify-between mb-[8px] flex-col-reverse sm:flex-row sm:h-[37px]'}>
            <div className={'flex'}>
                <img src={UserLogo} alt={'avatar'} className={'w-[36px] h-[36px] mr-[10px]'}/>
                <p>{author ?? 'User'}</p>
            </div>
            <div className={'flex justify-center flex-col mb-[8px] md:space-x-[30px] sm:flex-row'}>
                <div className={'flex justify-evenly mb-[10px] space-x-[10px] md:justify-between md:!mb-0'}>
                    <button className={'border border-[#0088EE] w-[64px] h-[28px] rounded-[2px] hover:shadow-lg'}>
                        <span className={'text-[#0088EE] text-[11px] leading-[11px]'}>Левый</span></button>
                    <button className={'border border-[#0088EE] w-[64px] rounded-[2px] h-[28px] hover:shadow-lg'}>
                        <span className={'text-[#0088EE] text-[11px] leading-[11px]'}>Центр</span></button>
                    <button className={'border border-[#0088EE] w-[64px] rounded-[2px] h-[28px] hover:shadow-lg'}>
                        <span className={'text-[#0088EE] text-[11px] leading-[11px]'}>Правый</span></button>
                </div>
                <div className={'flex space-x-[10px]'}>
                    <img src={Send} alt={'send'} className={'w-[18px] h-[20px] cursor-pointer hover:shadow-lg'}/>
                    <img src={Window} alt={'window'} className={'w-[18px] h-[20px] cursor-pointer'}/>
                    <img src={Parameter} alt={'param'} className={'w-[18px] h-[20px] cursor-pointer'}/>
                    <img src={isFavorite?starBlue:starGray} alt={'star'} className={'w-[18px] h-[20px] cursor-pointer'} onClick={isFavorite?removePostFromFavorites:addPostToFavorites}/>
                </div>
            </div>
        </div>
    )
}
const PostBody = ({date, content, attachments}: Partial<IResponsePost>) => {
    const dateObj = new Date(date ?? '');

    const fixTime=(value:number)=>{
        if(value<9) return `0${value}`
        return `${value}`
    }
    const dateStr = `${fixTime(dateObj.getHours())}:${fixTime(dateObj.getMinutes())}`;

    return (
        <div className={'w-full flex space-x-[10px] mb-[8px]'}>
            <div>{dateStr}</div>
            <div className={'flex flex-col space-y-[8px]'}>
                <div className={'text-[16px] max-h-[80px] leading-tight overflow-hidden'}>{content}</div>
                <div className={'text-[12px] leading-[10px] text-[#808080] cursor-pointer'}>Далее</div>
                {attachments?.length ? <div>
                    {attachments[0].type === 'video' ? <video src={attachments[0].url} controls width={260}/> :
                        <img src={attachments[0].url} alt={'img'} className={'w-[146px]'}/>
                    }
                </div> : <div>
                    <img src={defaultPostImg} alt={'img'}/>
                </div>}
            </div>
        </div>
    )
}

const PostFooter = () => {
    return (
        <div className={'flex w-full space-x-[8px]'}>
            <div className={'text-[#0088EE] text-[12px]'}>#Новое</div>
            <div className={'text-[12px] text-[#808080]'}>#Эксперт</div>
        </div>
    )
}
