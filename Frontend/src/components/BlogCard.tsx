// so this will be the blog card here 

import { Link } from "react-router-dom";
import { blog } from "../hooks";


export const BlogCard = ({ id, time, title, author, content }: blog) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="w-screen max-w-screen-md p-4 pb-4 mx-2 my-8 border-b cursor-pointer border-slate-200">

                <div className="flex items-center">
                    <Avatar name={author.name} />

                    <div className="flex flex-col justify-center pl-2 mx-4 text-sm font-light">{author.name.toUpperCase()}</div>

                    <div className="flex flex-col justify-center pl-2 mx-4 font-mono text-xs font-extralight text-slate-500">{time.substring(0, 10)}</div>
                </div>
                <div className="pt-2 mt-4 text-xl font-semibold">{title}</div>

                <div className="mt-4 font-thin text-md">{content.length <= 100 ? content : content.substring(0, 100) + "..."}</div>

                <div className="pt-4 text-sm font-thin text-slate-500">
                    {` ${Math.ceil(content.length / 100)}  min(s)  read..`}
                </div>
            </div>
        </Link>
    )
}

export function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-600 rounded-full">
            <span className="font-light text-white text-md dark:text-gray-300">
                {name[0]?.toUpperCase()}
            </span>
        </div>
    );
}