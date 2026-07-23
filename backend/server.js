import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js"
dotenv.config();


console.log(process.env.MONGODB_URL);

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => {
    console.log(`listening to ${PORT}`)
})