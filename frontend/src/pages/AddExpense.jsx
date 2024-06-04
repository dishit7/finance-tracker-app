import axios from "axios";
import { Categories } from "../components/Categories";
import { useState,useRef,useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
export const AddExpense = () => {


    const [selectedCategory, setSelectedCategory] = useState(null);
    const [user_id,setUserId]=useState(null)
    const inputRef= useRef(null)
    const navigate=useNavigate()
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

  const handleInputChange =()=>{
  const amount=inputRef.current.value
  console.log("amount is"+amount)
  }
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };


  const addExpense=async ()=>{try{
  const category_id=selectedCategory.category_id
  const amount=inputRef.current.value
  console.log("category:id "+category_id+"amount"+amount+"userId"+user_id)
  const response= await axios.post("https://finance-tracker-api-gray.vercel.app/expense",{
    user_id,
    amount,
    category_id
  }).then((response)=>{
    console.log(response.data)
  alert("Expense Added")
  setTimeout(() => {
    navigate("/dashboard");
  }, 2000);})
}
  catch(err){
    console.log(err)
    alert(err)
  }
  }
  return (
    <>
      <div className="bg-gray-900">
        <div className="bg-black colour text-white sm:max-w-lg h-screen mx-auto ">
          <div className="flex flex-col items-center justify-center  h-screen border  ">
            <div className="flex flex-col justify-center items-center h-1/2  ">
              <h1>Today at {new Date().toDateString()}</h1>
              <input
                type="number"
                className="border-b    bg-transparent outline-none w-52 font-bold text-5xl"
                placeholder="0"
                required
                min="0"
                ref={inputRef}
                onChange={handleInputChange}
              ></input>
         {     selectedCategory &&  ( <div className="mt-4 text-xl">
              Expense of 
              <span className="text-xl">{selectedCategory.emoji}</span>
              <span className="text-xl">{selectedCategory.category_name}</span>
              </div>
            )}
            </div>
            <div className="mt-auto border border-gray-200 border-t rounded-t-3xl w-full h-1/2 " >
              <h1 className="text-2xl   text-gray-500 text-center my-4">
                Expenses
              </h1>
              <Categories onSelectCategory={handleCategorySelect}/>
            
            </div>
            <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={addExpense}>Add Expense</button>
          
          </div>
        
        </div>
      </div>
    </>
  );
};
