const express=require('express');
const app=express();
const dotenv=require('dotenv');

dotenv.config(); 

app.get('/',(req,res)=>{
    res.send('hi from node deployment testing');
})
const server=app.listen(process.env.PORT || 8080,()=>{
    console.log('server listening');
})