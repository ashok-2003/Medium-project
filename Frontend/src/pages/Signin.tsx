// so this will be our signin page signup
import { Link } from "react-router-dom"
import { QuoteLable } from "../components/QuoteLable"
import { Labelinput } from "../components/Labelinput"
import { useState } from "react"
import { Button } from "../components/Button"
import { z } from "zod"
import { toast } from "react-toastify"

const SigninSchema = z.object({
    email : z.string().email("Invalid email address"),
    password : z.string().min(6,"Minium 6 length password is required")
})
type signinrequestType = z.infer<typeof SigninSchema>


async function signinRequest({email , password} : signinrequestType) {
    console.log(email , password)
}

export const Signin = () => {

   
    const[email , setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleSignin = async () => {

        const res = SigninSchema.safeParse({
          email: email,
          password: password,
        });
      
        if (!res.success) {
          toast.error("Please check your input fields correctly");
          return;
        }
      
        try {
          await signinRequest({ email, password });
          toast.success("Signin successful");
        } catch (error) {
          toast.error("Signin failed. Please try again.");
        }
      };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center h-screen">
                <div className="flex justify-center">
                    <div>
                        <div className="font-serif text-3xl font-bold text-center">Enter your credentials</div>
                        <div className="font-light text-center text-gray-600 text-l">
                            Don't have an Account? <Link className="font-medium underline text-sky-800 " to={'/signup'}>Signup</Link>
                        </div>
                        <Labelinput label="Email" placeholder="ashok@gmail.com" onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                        <Labelinput label="Password" type="password" placeholder="min 6 letters" onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                        <Button label="Signin" onClick={handleSignin}/>
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
