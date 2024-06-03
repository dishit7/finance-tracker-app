import { useEffect,useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export const TotalExpense=()=>{

    const [user_id,setUserId]=useState(null)
     const getUserIdFromToken = () => {
      const token = localStorage.getItem('token');
      console.log("hi")
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded && decoded.userId) {
            return decoded.userId;
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
      return null; // Return null if token is invalid or missing
    };
    
    
    useEffect(() => {
      const userId = getUserIdFromToken();
      setUserId(userId)
      console.log('User ID:', userId);
      // You can use the user ID as needed (e.g., for API requests)
    }, []); 

    const [sum,setSum]=useState(0)
    useEffect(()=>{
        console.log("userid in totexpense is "+user_id)
    const result=  axios.get('http://localhost:5050/sum',{
    params:{user_id}
    
    }).then((response)=>{
        console.log("the sum is "+response.data.sum)
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