// so this will be the component that will be get imported 

import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export type blog =  {
    id : number
    time : string
    title : string 
    content : string
    author : {
        name : string
    }
}

export const useBlogId = ({id} : {id : string}) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<blog>({
        id : 0,
        time : "",
        title : "" ,
        content : "",
        author : {
            name : ""
        } 
    });
    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get(`${BACKEND_URL}api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setBlogs(response.data); // data comes as array in json format 
                setLoading(false);
            })
    }, [id])

    return {
        loading , 
        blogs
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<blog[]>([]);
    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get(`${BACKEND_URL}api/v1/blog/Bulk`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setBlogs(response.data); // data comes as array in json format 
                setLoading(false);
            })
    }, [])

    return {
        loading , 
        blogs
    }

}