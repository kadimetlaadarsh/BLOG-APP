import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from './../Redux/Store';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/user/login', {
                email: inputs.email,
                password: inputs.password,
            });

            // Log the entire response for debugging
            console.log('Response:', response);

            if (response.data.success) {
                if (response.data.user && response.data.user._id) {
                    localStorage.setItem("userId", response.data.user._id);
                    dispatch(authActions.login());
                    alert("User logged in successfully");
                    navigate("/");
                } else {
                    alert("Login failed: user data is missing in the response");
                }
            } else {
                alert("Login failed: " + response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred: " + error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={450}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    margin="auto"
                    marginTop={5}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    borderRadius={5}
                >
                    <Typography variant="h4" padding={3} textAlign="center" textTransform="uppercase">Login</Typography>
                    <TextField
                        onChange={handleChange}
                        value={inputs.email}
                        placeholder="Email"
                        name="email"
                        margin="normal"
                        type="email"
                        required
                    />
                    <TextField
                        onChange={handleChange}
                        value={inputs.password}
                        placeholder="Password"
                        name="password"
                        margin="normal"
                        type="password"
                        required
                    />
                    <Button type="submit" sx={{ borderRadius: 3, marginTop: 3 }} variant="contained" color="primary">Submit</Button>
                    <Button onClick={() => navigate("/register")} sx={{ borderRadius: 3, marginTop: 3 }} color="primary">Not a user? Please Register</Button>
                </Box>
            </form>
        </>
    );
};

export default Login;
