const express=require("express");
require("dotenv").config();
app=express();
app.get("/",(req,res)=>{

    res.send("hello himchuli how are you doing! hi")
})
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server running at ${port} `)
})
