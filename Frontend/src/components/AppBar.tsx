import { useNavigate } from "react-router-dom"
import { Button } from "./Button"

// so this is the app bar of it 
export const AppBar = () => {
    const navigate = useNavigate();
    return (
        <div className="flex px-5 mt-2 rounded-lg shadow-md navbar bg-base-100 bg-slate-100 border-b-gray-800">
            <div className="self-center flex-1 font-serif text-3xl font-bold ">
                medium
            </div>
            <div className="flex-none">
                <ul className="px-1 menu menu-horizontal">
                    <span className="self-center py-0 ">
                        {/* <button className="font-serif bg-amber-900"> create post </button> */}
                        <Button label="Create post" onClick={() =>{
                            navigate("/publish")
                        }} />
                    </span>
                </ul>
            </div>
        </div>
    )
}