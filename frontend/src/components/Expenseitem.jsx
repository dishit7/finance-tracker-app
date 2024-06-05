import { TotalExpense } from "./TotatExpense"

export const Expenseitem=({date,category,amount,emoji,time})=>{
    return(<>
    
    <div className="flex justify-between items-center pb-14">
        <h1 className="text-gray-400"> {dateFormatter(date)}</h1>
        <h1 className="  text-gray-400 text-lg">₹-{amount}</h1>
    </div>
    <div className="flex justify-between pb-3 ">
    <div className="flex gap-5">
        <div className="text-4xl ">{emoji}</div>
        <div>
        <h1 className="font-semibold text-lg capitalize">{category}</h1>
        <div className="text-gray-500">{time}</div>

        </div>
    </div>
    <div className="text-lg text-red-400">{amount}</div>

    </div>

    <hr  className="mt-10 mx-3 border-zinc-600 my-3"></hr>
    </>)
}

function dateFormatter(dateString){
    const options = {year:'numeric' ,month:'long',day:'numeric'}
    const date=new Date(dateString)
    return new Intl.DateTimeFormat('en-us',options).format(date)
} 