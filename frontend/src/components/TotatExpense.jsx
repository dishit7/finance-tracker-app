import { useEffect,useState } from 'react';
import axios from 'axios';



export const TotalExpense=()=>{
    const [sum,setSum]=useState(0)
    useEffect(()=>{
    const result=  axios.get('http://localhost:5050/sum').then((response)=>{
        console.log(response.data.sum)
        setSum(response.data.sum)
    }
        )
    },[sum])
    return (<>
    <div  className='flex  flex-col  mt-20 h-56 '>
          <h1 className='text-gray-400 mx-auto '>Spent this month</h1>
          <div className='flex justify-center mt-5 text-red-500'>
            <h1 className='text-4xl font-bold'>$-</h1>
            <h1 className='text-6xl'>{sum}</h1>
  
          </div>
          </div>

    </>)
}