// so this is the Button component 
interface Buttontype{
    label : string,
    onClick : React.MouseEventHandler<HTMLButtonElement>; // this is it's type 
}
export const Button = ({label , onClick} : Buttontype) => {
    return (
        <button onClick={onClick} type="button" className=" mt-4 me-2 mb-2 w-full rounded-lg bg-gray-800 px-5 py-2.5 text-lg font-serif
        font-medium text-white hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 focus:outline-none
         dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">{label}</button>
    );
}