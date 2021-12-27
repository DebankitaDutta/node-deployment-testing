const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
// const db= "mongodb+srv://admin:admin123@cluster0.1tw4j.mongodb.net/deployment?retryWrites=true&w=majority"
const path=require('path');
const User=require('./models/user');

dotenv.config(); 


// db connection

mongoose.connect(process.env.DB).then(()=>{
    console.log('db connected')
}).catch(err=>{
    console.log('connection failed');
})
//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// set template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.render('home')
})
app.post('/input',(req,res)=>{
    const {email,password,text}=req.body;
    const newUser=new User({
        email,
        password,
        text
    })
    newUser.save()
    .then(user=>{
        res.render('input',{newUser});
    })
    .catch(err=>{
        console.log(err);
    })
})

app.get('/fetch',(req,res)=>{
    res.render('fetch');
})

app.post('/output',async(req,res)=>{
    const{email,password}=req.body;
    const user=await User.findOne({email});
    // console.log(user);
    if(user){
        if(user.password===password){
            res.render('output',{user});
        }
        else{
            console.log('incorrect password');
            res.redirect('/fetch');
        }
    }
    else{
        console.log('user doesn;t exist');
        res.redirect('/fetch');
    }
})

const server=app.listen(process.env.PORT || 8080,()=>{
    console.log('server listening');
})