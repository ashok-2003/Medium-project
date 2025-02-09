// so this will return the the single blog only 

import { AppBar } from "../components/AppBar";
import { Avatar } from "../components/BlogCard"
import { SkeletonBlogCard } from "../components/SkeletonBlogCard";
import { useBlogId } from "../hooks"
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blogs } = useBlogId({
        id: id || " "
    })
    if (loading) {
        return <div>
            <AppBar />
            <div role="status" className="animate-pulse">
                <div className="grid justify-center mt-12">
                    <SkeletonBlogCard />
                    <SkeletonBlogCard />
                </div>
            </div>
        </div>
    }
    return (
        <div>
            <div>
                <AppBar />
            </div>
            <div className="grid justify-center mt-12">

                <div className="w-screen max-w-screen-md p-4 pb-4 mx-2 my-8 border-b border-slate-200">
                    <div className="flex items-center">
                        <Avatar name={blogs.author.name} />

                        <div className="flex flex-col justify-center pl-2 mx-4 text-sm font-light">{blogs.author.name.toUpperCase()}</div>

                        <div className="flex flex-col justify-center pl-2 mx-4 font-mono text-xs font-extralight text-slate-500">{blogs.time.substring(0, 10)}</div>
                    </div>
                    <div className="pt-2 mt-8 text-6xl font-bold ">{blogs.title}</div>

                    <div className="mt-8 mb-8 text-2xl font-semibold">{blogs.content}</div>

                </div>
            </div>
        </div>
    )
}