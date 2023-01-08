import { Box, IconButton, Container, Typography, Grid, Input, Button, InputLabel, FormControl, OutlinedInput, InputAdornment } from "@mui/material"
import usePage from "@services/Providers/PageProvider"
import useUsername from "@services/Providers/UsernameProvider";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { TextFieldWrapper } from "../Home/ListConsults";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const SignUp = () => {
    const { setPage } = usePage();
    const { setUsername } = useUsername();


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);

    

    const handleChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(`http://localhost:8888/coders-consultory-server/api/users/${inputs.user}/checkUser`).then(function (response) {
            console.log(response.data)
            setUsername(inputs.user)
            setPage("home")
            navigate("/")
        });
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, mt: 2, display: { xs: 'flex', md: 'none' } }}>
                
                <Container maxWidth="xl">
                    <IconButton
                        size="large"
                        aria-haspopup="true"
                        component={RouterLink}
                        color="inherit"
                        to="/login"
                        onClick={() => setPage("home")}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </Container>
            </Box>

            <Box display="flex"
                enctype='multipart/form-data'
                component="form"
                onSubmit={handleSubmit}
                alignItems="center"
            >
                <Grid sx={{ p: 4 , flexGrow: 1,}}>
                    <Grid container  alignItems="center">
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Sign in to your account</Typography>
                    </Grid>
                    <Grid item  container sx={{ mt: 2 }}>
                        <TextFieldWrapper
                            fullWidth
                            onChange={handleChange}
                            sx={{ my: 1 }}
                            id="usernameInput"
                            label="Username"
                            name="user"
                        />
                    </Grid>
                    <Grid item container sx={{ mt: 2 }}>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password-confirm">Password</InputLabel>
                            <OutlinedInput fullWidth
                                sx={{ borderRadius: "16px" }}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={handleChange}
                                name="password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs sx={{ p: 2 }}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary">
                            Sign In
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default SignUp