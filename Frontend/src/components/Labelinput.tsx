import { ChangeEvent } from "react"

// so this is the lable input feild 
interface LabelinputType {
    label : string,
    placeholder : string,
    onChange : (e:ChangeEvent<HTMLInputElement>) => void,  // this should be htmlinput element other wise when we set the value it will give the error 
    type? : string
}
export const Labelinput = ({label , placeholder , onChange , type} : LabelinputType ) =>{
    return(
        <div>
        <label className="block pt-4 mb-2 text-sm font-semibold text-black">{label}</label>
        <input onChange={onChange} type={type || "text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
    );
}