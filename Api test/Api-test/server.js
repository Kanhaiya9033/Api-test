const express = require('express');
const dataBase = require('./dbConnection/db')
const port = 3000;
const app = express();

app.use(express.json())

const userRouter = require('./Router/userRouter');
const adminRouter = require('./Router/adminRouter')
const userMangementRouter = require('./Router/userMangementRouter')

app.use('/api',userRouter);
app.use('/api',adminRouter);
app.use('/api',userMangementRouter)

app.listen(port,(err,res)=>{
    if(err){
        console.log("Sever is not running");
    }
    else{
        console.log(`server is running at ${port}`)
    }
})