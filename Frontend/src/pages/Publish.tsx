// so now this is the pubish file 
import { ChangeEvent, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Button } from "../components/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    return (
        <div>
            <AppBar />
            <div className="grid justify-center mt-12">

                <div className="w-screen max-w-screen-md p-4 pb-4 mx-2 my-8">
                    <div className="w-full max-w-screen-lg">
                        <input onChange={(e) => {
                            setTitle(e.target.value);
                        }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5" placeholder="Title" />
                    </div>
                    <TextEditor onChange={(e) => {
                        setContent(e.target.value)
                    }} />
                    <Button label="Publish" onClick={async () => {
                        try {
                            const token = localStorage.getItem("token")
                            const reponse = await axios.post(`${BACKEND_URL}api/v1/blog`, {
                                title: title,
                                content: content
                            }, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                            const id = reponse.data.id
                            // so now we have to navigate to that page 
                            toast.success("blog post created succefully")
                            navigate(`/blog/${id}`)
                        }
                        catch (err) {
                            toast.error("something went wrong re-try later")
                            return
                        }
                    }} />
                </div>
            </div>

        </div>
    )
}
function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
                <div className="w-full my-2 bg-white rounded-b-lg">
                    <label className="sr-only">Publish post</label>
                    <textarea onChange={onChange} id="editor" rows={8} className="block w-full px-0 pl-2 text-sm text-gray-800 bg-white border-0 focus:outline-none" placeholder="Write an article..." required />
                </div>
            </div>
        </div>
    </div>
}