import React from 'react';
import { useState } from 'react';
import {Box,AppBar,Toolbar,Button,Typography} from "@mui/material"
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import {Tabs,Tab} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../Redux/Store';

const Header = () => {
    const dispatch = useDispatch();
    //global state
    const isLogin = useSelector((state) => state.isLogin );
    const navigate=useNavigate()
    const handelLogout = () =>{
        try {
            dispatch(authActions.logout());
            alert('Logout succesfully');
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }

  const [value,setValue] = useState()
  return (
    <>
        <AppBar position="sticky" >
            <Toolbar>
                <Typography variant="h5" >My Blog App</Typography>
                {isLogin && (<><Box display={'flex'} marginLeft="auto" marginRight={'auto'} >
                <Tabs textColor="inherit" value={value} onChange  = {(e,val) => setValue(val)} >
                    <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                    <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                    <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
                </Tabs>
                </Box></>)}
    
                <Box display={"flex"} marginLeft="auto" >
                    {!isLogin && (<><Button sx={{margin: 1,color: "white"}} LinkComponent={Link} to="/login" >Login</Button>
                        <Button sx={{margin: 1,color: "white"}} LinkComponent={Link} to="/register" >Register</Button></>)}
                {isLogin && (<Button onClick={handelLogout} sx={{margin: 1,color: "white"}} >Logout</Button>) }
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Header