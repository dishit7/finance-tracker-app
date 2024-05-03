 import pg from "pg";
 import express from "express"
 import jwt from "jsonwebtoken" 

const app = express();
const port = 5050;
app.use(express.json());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "finance-tracker",
  password: "Bulbasaur_47",
  port: 3000,
});
db.connect();


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

app.listen(5050,()=>console.log("app is running on port 5050"))