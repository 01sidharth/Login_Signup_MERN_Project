let mongoose=require("mongoose")

let dataSchema= new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    cpass:String
})
let registerData= new mongoose.model("registeredUsers",dataSchema)

module.exports =registerData