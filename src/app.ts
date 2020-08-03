require("dotenv").config();
import express, { Application } from "express"
import userRouter from './routes/user.route'
import '../src/config/db' 
const app: Application = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/user", userRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('sever listening..');
})