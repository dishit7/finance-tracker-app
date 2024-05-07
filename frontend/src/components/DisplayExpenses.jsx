import { useSearchParams } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import  {useState,useEffect} from "react"
import axios from "axios"
import { Expenseitem } from "./Expenseitem"
 
  

 export const DisplayExpenses=()=>{
    const [expenses,setExpenses]=useState([])
    const token=localStorage.token
    const user_id=jwtDecode(token).userId
    console.log(user_id)
     useEffect(()=>{
      const result=axios.get(`http://localhost:5050/expense/${user_id}`).then((response)=>{
     setExpenses(response.data)
     console.log(expenses)
     } )
    }, [])
    return (
    <>

    <div>{user_id}</div>
    <div>{expenses.map((expense)=>{
        console.log("hi")
         return(
         <Expenseitem date={expense.credited_date } amount={expense.amount} time={expense.credited_time} emoji={expense.emoji} category={expense.category_name}/>
          
        )
    }
     )
      }
    </div>
     </>)
}
 
