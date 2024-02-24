import { Button, FormControl, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import Face6Icon from '@mui/icons-material/Face6';



const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const Register = () => {



  let Navigate = useNavigate()
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [phone, setPhone] = useState("")
  let [pass, setPass] = useState("")
  let [cpass, setCpass] = useState("")

  let [nameIn,setNamein]=useState("")
  let [passIn, setPassin] = useState("")
  let [emailIn, setEmailin] = useState("")
  let [phoneIn, setPhonein] = useState("")
  let [passError, setPasserror] = useState(false)
  let [nameError, setNameerror] = useState(false)
  let [emailError, setEmailerror] = useState(false)
  let [phoneError, setPhoneerror] = useState(false)

  let namehandler = () => {
    if (!name) {
      setNameerror(true)
      return
    }
    setNameerror(false)
  }

  let emailhandler = () => {
    if (!isEmail(email)) {
      setEmailerror(true)
      setEmailin("invalid email address")
      return
    }
    setEmailerror(false)
    setEmailin("")
  }

  let phonehandler = () => {
    if (!phone || (phone.length>10 ||  phone.length<10)) {
      setPhoneerror(true)
      setPhonein("number should be 10 digit")
      return
    }
    setPhoneerror(false)
    setPhonein("")
  }

  let formhandler = (e) => {
    e.preventDefault()
    if (pass !== cpass) {
      setPassin("password should match")
      setPasserror(true)
      return
    }
    else if (!pass || pass.length < 8 || pass.length > 20) {
      setPassin("password should contain atleast 8 characters")
      setPasserror(true)
      return

    }
    else if(!isEmail(email)){
      setEmailerror(true)
      setEmailin("invalid email address")
      return

    }
    else if(phone.length>10 ||  phone.length<10)
    {
      setPhoneerror(true)
      setPhonein("number should be 10 digit")
      return
    }
    else {
      setPassin("")
      setPasserror(false)
      let payload = {
        name,
        email,
        phone,
        cpass
      }
      axios.post("http://localhost:8000/check", payload)
      .then((res) => {
          if (res.data=="success") {
            console.log("same user");
            alert("same user")
            setEmailin("already registerd user")
            setEmailerror(true)
            return


          }
          else {
            axios.post("http://localhost:8000/register", payload)
              .then((res) => { console.log("data send", res); })
              .catch(() => { console.log("data not send"); })

            Navigate("/")

          }
        })
        .catch(() => {
          console.log("error");

        })


    }



  }

  return (
    <div className='portrait:h-[35rem] portrait:w-96 landscape:h-[100vh] w-[100%] bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... flex justify-center items-center'>
      <FormControl className=' portrait:h-[30rem] portrait:w-64 landscape:h-[30rem] landscape:w-80 shadow-slate-950 shadow-sm flex flex-col items-center justify-evenly '>
        <h1>Registration</h1>
        <TextField id="outlined-basic" label="Name" helperText={nameIn} variant="outlined" color='primary' size='small' value={name} sx={{ width: { lg: 250 } }} required onChange={(e) => { setName(e.target.value) }} error={nameError} onBlur={namehandler} />
        <TextField id="outlined-basic" label="Email" variant="outlined" size='small' type='email' value={email} sx={{ width: { lg: 250 } }} required onChange={(e) => { setEmail(e.target.value) }} helperText={emailIn} error={emailError} onBlur={emailhandler} />
        <TextField id="outlined-basic" label="Phone" helperText={phoneIn} variant="outlined" size='small' value={phone} required sx={{ width: { lg: 250 } }} onChange={(e) => { setPhone(e.target.value) }} error={phoneError} onBlur={phonehandler} />
        <TextField id="outlined-basic" label="Create-Password" variant="outlined" type='password' required size='small' sx={{ width: { lg: 250 } }} value={pass} helperText={passIn} error={passError} onChange={(e) => { setPass(e.target.value) }} />
        {/* <p className='invalid text-red-800 text-xs relative right-11 bottom-4'></p> */}
        <TextField id="outlined-basic" label="Conform-Password" variant="outlined" type='password' required size='small' sx={{ width: { lg: 250 } }} value={cpass} helperText={passIn} error={passError} onChange={(e) => { setCpass(e.target.value) }} />
        {/* <p className='invalid1 text-red-800 text-xs relative right-11 bottom-4'></p> */}
        <p><Link to="/">already have account? Login</Link></p>

        <Button variant="contained" className=' h-11 w-32' endIcon={<Face6Icon/>}  onClick={formhandler}>Register</Button>
      </FormControl>

    </div>
  )
}

export default Register