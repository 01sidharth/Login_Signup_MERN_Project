import { Button, FormControl, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Face6Icon from '@mui/icons-material/Face6';


const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const Login = () => {
  let navigate=useNavigate()
  let [email,setName]=useState("")
  let [pass,setPass]=useState("")

  let [userError,setUsererror]=useState(false)
  let [passError,setPasserror]=useState(false)
  let [userIn,setUserin]=useState("")
  let [passIn,setPassin]=useState("")

  let handleInput=()=>{
    if(!isEmail(email)){
      setUsererror(true)
      setUserin("invalid username")
      return;
    }
    setUsererror(false)
    setUserin("")
    
  }
  let handlePass=()=>{
    if(!pass || pass.length<5 || pass.length>20){
      setPasserror(true)
      return
    }
    setPasserror(false)
  }

  let formhandler=(e)=>{
    e.preventDefault()
    let payload={
      email,
      pass
    }
    axios.post("http://localhost:8000/login",payload)
    .then((res)=>{
      if(res.data=="success"){
        console.log("registered user");
        
        navigate("/home")
      }
      else if(res.data=="err"){
        setUserin("Inavlid username")
        setPassin("Invalid password")
        setUsererror(true)
        setPasserror(true)
        return
      }
      else{
        setPassin("invalid password")
        setUserin("")
        setPasserror(true)
        return
      }
    })
    .catch(()=>{console.log("error");
    
  })
  }
  return (
    <div className='h-[100vh] w-[100%] bg-gradient-to-r from-cyan-500 via-teal-600 to-lime-700 flex justify-center items-center'>
        <FormControl className='h-[350px] w-96 shadow-slate-950 shadow-sm flex flex-col items-center justify-evenly '>
            <h1>LOGIN</h1>
            <TextField id="outlined-basic" error={userError}  label="Username" variant="outlined" size='small' helperText={userIn} value={email} onBlur={handleInput} onChange={(e)=>{setName(e.target.value)}}/>
            <TextField id="outlined-basic" label="Password" type="password" variant="outlined" size='small' helperText={passIn} error={passError} onBlur={handlePass} value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
            <p><Link to='/register'>new user? Register</Link></p>
            <Button variant="contained" className='w-20 h-11' onClick={formhandler} endIcon={<Face6Icon/>} sx={{width:100,backgroundColor:"transparent",color:"black","&:hover":{color:"white"}}} >SUBMIT</Button>
        </FormControl>

    </div>
  )
}

export default Login