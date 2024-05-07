export const Expenseitem=({date,category,amount,emoji,time})=>{
    return(<>
    <div className="flex justify-between">
        <div>{date}</div>
        <div>{amount}</div>
    </div>
    <div className="flex justify-between">
    <div className="flex">
        <div>{emoji}</div>
        <div>{category}</div>

    </div>
    <div>{amount}</div>
    <div>{time}</div>
    </div>

    </>)
}

 