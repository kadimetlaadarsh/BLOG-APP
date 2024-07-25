import React from 'react';
import { useState } from 'react';
import {Box,Typography,TextField,Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate()
  const [inputs,setInputs] = useState({
    name:'',
    email:'',
    password:''
});

const handelChange = (e)=>{
  setInputs((prevState) => ({
    ...prevState,
    [e.target.name]:e.target.value
  }))};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/api/v1/user/register', {
            username: inputs.name,
            email: inputs.email,
            password: inputs.password,
        });

        if (response.data.success) {
            alert("User Registered Successfully");
            navigate("/login");
        } else {
            alert("Registration failed");
        }
    } catch (error) {
        console.log(error);
        alert("An error occurred",error.message);
    }
};

  
  return (
    <>
    <form onSubmit={handleSubmit} >
      <Box maxWidth={450} display="flex" flexDirection={'column'} alignItems="center" justifyContent={"center"} margin="auto" marginTop={5} boxShadow="10px 10px 20px #ccc" padding={3} borderRadius={5} >
        <Typography variant="h4" padding={3} textAlign="center" textTransform={'uppercase'} >Register</Typography>
        <TextField onChange={handelChange} value={inputs.name} placeholder='name' name="name" margin="normal" type={"text"} required />
        <TextField onChange={handelChange} value={inputs.email} placeholder='email' name="email" margin="normal" type={"email"} required />
        <TextField onChange={handelChange} value={inputs.password} placeholder='password' name="password" margin="normal" type={"password"} required />
        <Button type="submit" sx={{borderRadius:3,marginTop:3}} variant="contained" color="primary" >Submit</Button>
        <Button onClick={() =>navigate("/login")} type="submit" sx={{borderRadius:3,marginTop:3}}  color="primary" >Already Registered ? Please Login</Button>
      </Box>
      </form>
    </>
  )
}

export default Register;