 import axios from "axios" 
 import { useState,useEffect } from "react"
 import {useNavigate} from "react-router-dom"
 export const Categories =({onSelectCategory}) =>{
    const [categories,setCategories]=useState([])
    const navigate=useNavigate()


    useEffect(()=>{
        const result=axios.get("https://finance-tracker-api-gray.vercel.app/category").then((response)=>{
            setCategories(response.data)
            console.log(categories)
        })
      },[])
      
      const handleAddCategory = ()=>{
       navigate("/createcategory")
      }
      const handleCategoryClick = (category) => {
        if (onSelectCategory) {
          onSelectCategory(category);
        }
      };
    

return (<>
     <div className="grid grid-cols-4">
     <div className="bg-white text-black rounded-full w-12 h-12 text-center text-4xl" onClick={handleAddCategory}>+</div>
        {categories.map((category)=>{
            return(<div 
            key={category.category_id}
            onClick={() => handleCategoryClick(category)}
            className="cursor-pointer"
            >   {console.log(category.emoji+category.category_name)}
                <div className="text-4xl"> {category.emoji}</div>
                <div className="text-2xl"> {category.category_name}</div>

                </div>
            )
        })}
     </div>
</>)

     
 }
