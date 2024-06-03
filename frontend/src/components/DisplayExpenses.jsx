import { useSearchParams ,useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";
import { Expenseitem } from "./Expenseitem";
import { TotalExpense } from "./TotatExpense";
import { Button } from "../ReusableComponents/Button";
export const DisplayExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate=useNavigate()
  const token = localStorage.token;
  const user_id = jwtDecode(token).userId;
  console.log(user_id);


  useEffect(() => {
    const result = axios
      .get(`https://finance-tracker-app-eosin.vercel.app/expense/${user_id}`)
      .then((response) => {
        setExpenses(response.data);
        console.log(expenses);
      });
  }, []);

 function handleClick(){
   navigate("/addExpense")
 }

  return (
    <>
      <div className="bg-gray-900">
        <div className="bg-black colour text-white sm:max-w-lg min-h-screen mx-auto ">
          <div className="flex justify-center">
            <h1 className="font-bold uppercase  mt-12">expenses</h1>
          </div>
          <TotalExpense />
          {/* <div>{user_id}</div> */}
          <div>
            {expenses.map((expense) => {
              console.log("hi");
              return (
                <Expenseitem
                  date={expense.credited_date}
                  amount={expense.amount}
                  time={expense.credited_time}
                  emoji={expense.emoji}
                  category={expense.category_name}
                />
              );
            })}
          </div>
          <div className="text-center"><Button name="Add Expense" onClick={handleClick}/></div>

        </div>

      </div>
    </>
  );
};


 