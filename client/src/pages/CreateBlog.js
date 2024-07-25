import React, { useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const CreateBlog = () => {
    const navigate=useNavigate();
    const id=localStorage.getItem('userId')
    const [input,setInput] = useState({
        title:'',
        description:'',
        image:''
    });
    const handelSubmit = async(e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.post('api/v1/blog/create-blog',{
            title:input.title,
            description:input.description,
            image:input.image,
            user:id,
            })
            if(data?.success){
                alert('Blog Created')
                navigate('/my-blogs')
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handelChange = (e) => {
        setInput(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
  return (
    <>
        <form onSubmit={handelSubmit}>
        <Box width={"50%"} border={3} borderRadius={10} padding={3} margin="auto" boxShadow={"10px 10px 20px #ccc"} display="flex" flexDirection={"column"}marginTop="30px" >
            <Typography variant="h2" textAlign={"center"} fontWeight="bold" padding={3} color="gray" >
                create a pots
            </Typography>
            <InputLabel sx={{mb: 1,mt: 2,fontSize:"24px", fontWeight:"bold" }} required >Title</InputLabel>
            <TextField name="title" onChange={handelChange} value={input.title} margin="normal" variant="outlined" />
            <InputLabel sx={{mb: 1,mt: 2,fontSize:"24px", fontWeight:"bold" }} required >Description</InputLabel>
            <TextField name="description" onChange={handelChange} value={input.description} margin="normal" variant="outlined" />
            <InputLabel sx={{mb: 1,mt: 2,fontSize:"24px", fontWeight:"bold" }} >image</InputLabel>
            <TextField name="image" onChange={handelChange} value={input.image} margin="normal" variant="outlined" />
            <Button type="submit" color="primary" variant="contained" >Submit</Button>
        </Box>
        </form>
    </>
  )
}
