import { Button } from "../ReusableComponents/Button";
import axios from "axios"
export const CreateCategory = () => {
    async function createTag(e){
        try{
            console.log("hi")
        e.preventDefault()
        const formData=new FormData(e.target)
        const emoji=formData.get("emoji")
        const category_name=formData.get("category_name")

        console.log(emoji+category_name)

    const response=await axios.post("https://finance-tracker-app-eosin.vercel.app/category" ,{
        emoji,
        category_name
    })
    console.log(response.data)
   alert("Catgory added")
}catch(err){
    alert("error occured pls try again")
    console.log(err)
}
  }
  return (
    <>
      <div className="bg-gray-900">
        <div className="bg-black colour text-white sm:max-w-lg h-screen mx-auto flex flex-col justify-center items-center">
          <div className="  border-t border-zinc-200 w-full">
            <h1 className="text-gray-400 text-center mb-5 pt-3 ">NEW TAG</h1>
            <form className="flex flex-col justify-center items-center gap-8 " onSubmit={createTag}>
              <input
                placeholder="(sticker)"
                className="border-b outline-none text-center bg-transparent "
                name="emoji"
              />
              <input
                placeholder="(name)"
                className="border-b outline-none text-center bg-transparent "
                name="category_name"
              />
              <button
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                name="Add Category"
                type="submit"
              >Add Category</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
