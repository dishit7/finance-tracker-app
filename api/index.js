 import pg from "pg";
 import express from "express"
 import jwt from "jsonwebtoken" 
 import cors from "cors"
const app = express();
const port = 5050;
app.use(cors(
  {origin:"https://finance-tracker-app-frontend.vercel.app",
  methods:"GET,POST,PUT,PACTH,DELETE",
  credentials: true, // Allow cookies to be sent
}
))
app.use(express.json());

const db = new pg.Client({
  user: "neondb_owner",
  host: "ep-gentle-pond-a5m8vh0g-pooler.us-east-2.aws.neon.tech",
  database: "finance-tracker",
  password: "Acfpd8yJaE6O",
  port: 5432, // Default PostgreSQL port,
  ssl: {
    rejectUnauthorized: false, // set this to true for stricter security
  },
 
});
db.connect();

app.get("/",(req,res)=>{
  res.send("hi")
})
app.post("/signup", async (req, res) => {
    try {
      const { email, name, password } = req.body;
  
      // Insert user into the database
      const result = await db.query(
        "INSERT INTO USERS (email, name, password) VALUES ($1, $2, $3) RETURNING *",
        [email, name, password]
      );
  
      const user = result.rows[0];
  
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, "your_secret_key", {
        expiresIn: "1h", // Token expiration time
      });

      res.json({ user, token });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ error: "An error occurred while signing up" });
    }
  });
  



  // Signin route
  app.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Retrieve user from the database based on email
      const result = await db.query("SELECT * FROM USERS WHERE email = $1", [
        email,
      ]);
  
      const user = result.rows[0];
  
      // If user not found or password doesn't match, return error
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, "your_secret_key", {
        expiresIn: "1h", // Token expiration time
      });
  
      res.json({ user, token });
    } catch (error) {
      console.error("Error signing in:", error);
      res.status(500).json({ error: "An error occurred while signing in" });
    }
  });




//Rout to add category  
app.post("/category",async(req,res)=>{
  try {
  const {emoji,category_name}= req.body;
  const result=await db.query("INSERT INTO expense_category (emoji,category_name) VALUES ($1,$2)",[emoji,category_name])
  console.log(result)
  return res.send ("query successfull")
  }
  catch(err){
    console.log(err);
    return res.send("query failed")
  }
})

app.get("/category",async(req,res)=>{
  try{
  const result= await db.query("SELECT * FROM expense_category")
  return res.send(result.rows)
  
  }
  catch{
    console.log(err)
    return res.send("query failed")
  }
})

//Route to add expense
app.post("/expense",async(req,res)=>{
  try{
      const {user_id,amount,category_id}=req.body
      const result=await db.query("INSERT INTO expenses (amount,user_id,category_id) VALUES ($1,$2,$3)",[amount,user_id,category_id])
      console.log(result)
      return res.send("query successful")    }
  catch(err){
    console.log(err)
    return res.send("query failed")    

  }
})
//route to get all expenses of today
app.get("/expense/:user_id",async(req,res)=>{
  try{
    const user_id=req.params.user_id
    console.log(user_id)
    const result=await db.query(`SELECT expenses.amount, TO_CHAR(expenses.credited_at,'YYYY-MM-DD') AS credited_date,    TO_CHAR(expenses.credited_at, 'HH12:MI AM') AS credited_time, 
    expense_category.emoji, expense_category.category_name FROM expenses  LEFT JOIN expense_category ON expenses.category_id = expense_category.category_id WHERE EXTRACT(MONTH FROM expenses.credited_at) = EXTRACT(MONTH FROM CURRENT_DATE) AND expenses.user_id = 
    '`+user_id+`';`)
    console.log(result.rows)
    return res.json(result.rows)
  }catch(err){
    console.log(err)
    return res.send("query failed")
  }
  /**/
})

app.get("/sum",async(req,res)=>{
  try{
    const {user_id}=req.query

    const result = await db.query(
      `SELECT SUM(amount) 
       FROM expenses 
       WHERE EXTRACT(MONTH FROM credited_at) = EXTRACT(MONTH FROM CURRENT_DATE) 
       AND user_id = $1`, 
      [user_id]
    );
        return res.send(result.rows[0])
  }catch(err){
    console.log(err)
    return res.send("query failed")
  }
  /**/
})//"d9d9f33c-ecef-46a0-91b2-7d52fc5a487


app.listen(5050,'0.0.0.0',()=>console.log("app is running on port 5050"))



//"d9d9f33c-ecef-46a0-91b2-7d52fc5a4878"
//"e895d488-e8fd-4f02-8ea4-149941928d13"
/*SELECT expenses.amount, DATE(credited_at), expense_category.emoji, expense_category.category_name
FROM expenses 
LEFT JOIN expense_category ON expenses.category_id = expense_category.category_id
WHERE EXTRACT(MONTH FROM expenses.credited_at) = EXTRACT(MONTH FROM CURRENT_DATE)
AND expenses.user_id = 'd9d9f33c-ecef-46a0-91b2-7d52fc5a4878';
*/