import express from "express";
import mongoose from "mongoose";
import path from "path";
const __dirname = path.resolve();

mongoose.connect("mongodb+srv://vaibhav:Vaib4mongodb@cluster0.reflvjg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{          // connecting to database
    dbName:"sps",
  
})
.then(()=>{console.log("Database connected.")})
.catch((e)=> console.log(e));

const userdata = new mongoose.Schema({                   // creating a schema
    name : String,
    email : String,
    message : String
});

const user_data = mongoose.model("samarth_pumping_contact_detail",userdata);        // creating collection , collection name will be in plural form



const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));          // write as-it-is to form a middle-wayer to get data from user
app.use(express.static(path.join(__dirname, 'public')));   //to make the things inside the public folder available publically

app.get("/sps",(req,res)=>{
    res.render("index.ejs");
});

app.post("/sps",(req,res)=>{
    const data = {name : req.body.name , email : req.body.email , message : req.body.message};      // storing data in form of json
    const isdatapresent = user_data.find({email : data.email});
    if(isdatapresent.email== data.email)
    {
        
    }
    else
    {
        user_data.insertMany(data);                               // putting data in database
        res.render("thankyou.ejs",{name:data.name});
    }
});


app.listen(8001,()=>{
    console.log("server is working");
});
   





