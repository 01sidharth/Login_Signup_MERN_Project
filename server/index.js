let express=require("express")
let app=express()
let mongoose=require("mongoose")
let cors=require("cors")
let bodyParser=require("body-parser")
let registerData=require("./models/registerschema")

mongoose.connect("mongodb://127.0.0.1:27017/mernUsers")
mongoose.connection
.once("open",()=>{console.log("database connected");})
.on("error",()=>{console.log("error");})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.post("/register",(req,res)=>{
  let details= new registerData(req.body)
  details.save()
  .then((data)=>{res.json(data)})
  .catch((error)=>{res.json(error)})
})

// app.post("/register",(req,res)=>{
//   console.log(req.body);
//   registerData.findOne({email:req.body.email})
//   .then((user)=>{
//     if(user!==null){
//       res.json("email is already registered")
//     }
//     else{
//       let details=new registerData(req.body)
//       details.save()
//       .then((user)=>{res.json(user)})
//       .catch(()=>{res.json("data didnt save")})
//     }
//   })
//  .catch((err)=>{console.log(err);})
// })


app.post("/login",(req,res)=>{
  registerData.findOne({email:req.body.email})
  .then((user)=>{
    if(user.cpass==req.body.pass){
      res.json("success")
    }
    else{
      res.json("failure")
    }
  })
  .catch((err)=>{
    console.log("error");
    res.json("err")
  })
})

app.post("/check",(req,res)=>{
  registerData.findOne({email:req.body.email})
  .then((user)=>{
    if(user.email==req.body.email){
      res.json("success")
    }
    else{
      res.json("failure")
    }
  })
  .catch((err)=>{
    console.log("error");
    res.json("err")
  })
})



app.listen("8000",()=>{
    console.log("listening to port 8000");
})