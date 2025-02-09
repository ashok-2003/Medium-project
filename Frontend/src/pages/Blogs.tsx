import { useBlogs } from "../hooks"
import { BlogCard } from '../components/BlogCard'
import { AppBar } from "../components/AppBar";
import { SkeletonBlogCard } from "../components/SkeletonBlogCard";

// so here all blogs will show up
export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return (
            <div>
                <div>
                    <AppBar />
                </div>
                <div role="status" className="animate-pulse">
                    <div className="grid justify-center mt-12">
                        <SkeletonBlogCard />
                        <SkeletonBlogCard />
                        <SkeletonBlogCard />
                        <SkeletonBlogCard />
                    </div>
                </div>
            </div>
        )
    }
    // so now if not loading the we have to inplement this
    return (
        <div>
            <div className="block ">
                <AppBar />
            </div>
            <div className="grid justify-center mt-12 ">
                <div>
                    {blogs.map(blog => <BlogCard
                        id={blog.id}
                        author={blog.author}
                        title={blog.title}
                        content={blog.content}
                        time={blog.time}
                    />)}
                </div>
                {/* <BlogCard
                    id = {1}
                    time="22 March 2023"
                    title="Introduction to React"
                    author={{ name: "John Doe" }}
                    content="React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications."
                />
                <BlogCard
                    id= {1}
                    time={"22 March 2023"}
                    title="Introduction to React"
                    author={{ name: "John Doe" }}
                    content="React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications."
                />
                <BlogCard
                    id= {1}
                    time="22 March 2023"
                    title="Introduction to React"
                    author={{ name: "John Doe" }}
                    content="React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications."
                />
                <BlogCard
                    id= {1}
                    time="22 March 2023"
                    title="Introduction to React"
                    author={{ name: "John Doe" }}
                    content="React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications."
                /> */}
            </div>
        </div>
    )
}