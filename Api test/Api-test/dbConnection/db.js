const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kanha:Kanhaiya123@cluster0.qya2jzw.mongodb.net/?retryWrites=true&w=majority',(err,res)=>{
    if(err){
        console.log("dataBase is not connected");
    }else{
        console.log("Database is connected");
    }
})