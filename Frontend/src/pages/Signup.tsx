import { Link , useNavigate } from "react-router-dom"
import { QuoteLable } from "../components/QuoteLable"
import { Labelinput } from "../components/Labelinput"
import { useState } from "react"
import { Button } from "../components/Button"
import { z } from "zod"
import { toast } from "react-toastify"
import axios from "axios"
import { BACKEND_URL } from "../config"


const SignupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Minium 6 length password is required")
})
type signuprequestType = z.infer<typeof SignupSchema>



async function signupRequest({ name, email, password }: signuprequestType , Navigate : any) {
    try {
        // so now it will create the user 
        const response = await axios.post(`${BACKEND_URL}api/v1/user/signup`, {
            name: name,
            email: email,
            password: password
        })
        const jwt = response.data.token;
        localStorage.setItem("token" , jwt); 
        // have set the item after it 
        toast.success("Signup successful");
        Navigate('/blogs')
    }
    catch (err) {
        toast.error("error while signup try later")
        return
    }
}

export const Signup = () => {

    // we can create the single state in json format for but for avoid re-rendring creating the three seperate variable
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate(); // navigate should be used inside the react component

    const handleSignup = async () => {
        // Zod validation
        const res = SignupSchema.safeParse({
            name: name,
            email: email,
            password: password,
        });

        if (!res.success) {
            toast.error("Please check your input fields correctly");
            return;
        }

        await signupRequest({ name, email, password } , Navigate);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center h-screen">
                <div className="flex justify-center">
                    <div>
                        <div className="font-serif text-3xl font-bold text-center">Create an account</div>
                        <div className="font-light text-center text-gray-600 text-l">
                            Already have an account? <Link className="font-medium underline text-sky-800 " to={'/signin'}>Signin</Link>
                        </div>
                        <Labelinput label="Name" placeholder="Ashok" onChange={(e) => {
                            setName(e.target.value)
                        }} />
                        <Labelinput label="Email" placeholder="ashok@gmail.com" onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                        <Labelinput label="Password" type="password" placeholder="min 6 letters" onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                        <Button label="Signup" onClick={handleSignup} />
                    </div>
                </div>
            </div>



            {/* here is the right side quote  */}


            <div className="hidden lg:block">
                <QuoteLable />
            </div>
        </div>
    )
}
