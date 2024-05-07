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
          <div>{sum}</div>
    </>)
}