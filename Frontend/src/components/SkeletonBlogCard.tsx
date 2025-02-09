// so this will be the skeleton blog for the loading purpose only 
export const SkeletonBlogCard = () => {
    return (
        <div>
            <div className="w-screen max-w-screen-md p-4 pb-4 mx-2 my-8 border-b cursor-pointer border-slate-200">

                <div className="flex items-center bg-gray-200">

                    <div className="flex flex-col justify-center pl-2 mx-4 text-sm font-light bg-gray-200">{ }</div>

                    <div className="flex flex-col justify-center pl-2 mx-4 font-mono text-xs bg-gray-200 font-extralight text-slate-500">{ }</div>
                </div>
                <div className="pt-2 mt-4 text-xl font-semibold bg-gray-200">{ }</div>

                <div className="mt-4 font-thin bg-gray-200 text-md">{ }</div>

                <div className="pt-4 text-sm font-thin bg-gray-200 text-slate-500">
                    { }
                </div>
            </div>
        </div>
    )
}