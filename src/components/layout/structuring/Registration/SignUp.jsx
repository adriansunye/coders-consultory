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
    const { username, setUsername } = useUsername();


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const fileInput = useRef();
    const submitForm = useRef();
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleChange = (event) => {
        const name = event.target.name;
        let value = event.target.files ? event.target.files[0] : event.target.value;
        if (event.target.files) {
            setSelectedFile(value)
        }
        setInputs(values => ({ ...values, [name]: value }));
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const { fileMedia, ...otherInputs } = inputs;
        const body = new FormData();
        body.append('image', inputs.fileMedia);
        const data = { ...otherInputs }
        const parsedData = JSON.stringify(data);
        body.append('_jsonData', parsedData);
        console.log(inputs)

        axios.post('http://localhost:8888/coders-consultory-server/api/users', body).then(function (response) {
            setUsername(inputs.user)
            setPage("home")
            navigate("/")
        });
    }

    function checkUser() {
        console.log(username)
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

                <Grid sx={{ p: 4 }}>
                    <Grid container display="flex" alignItems="center">
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Create New Account</Typography>
                    </Grid>
                    <Grid container display="flex" alignItems="center">
                        <Typography variant="body">Set up your username and passward. You can change it later.</Typography>
                    </Grid>
                    <Grid item container sx={{ mt: 2 }}>
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
                        <TextFieldWrapper
                            fullWidth
                            onChange={handleChange}
                            sx={{ my: 1 }}
                            id="emailInput"
                            label="Email"
                            name="email"
                        />
                    </Grid>
                    <Grid item container sx={{ mt: 2 }}>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                sx={{ borderRadius: "16px" }}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                name="passwordToCheck"
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
                    <Grid item container sx={{ mt: 2 }}>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password-confirm">Confirm Password</InputLabel>
                            <OutlinedInput fullWidth
                                sx={{ borderRadius: "16px" }}
                                id="outlined-adornment-password-confirm"
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
                                label="Confirm Password"
                            />
                        </FormControl>
                        <Grid item xs container>
                            <Button onClick={() => fileInput.current.click()} sx={{ p: 2 }}>
                                Add Picture
                            </Button>
                            <Button onClick={checkUser} sx={{ p: 2 }}>Check User</Button>
                        </Grid>
                        <input
                            name="fileMedia"
                            ref={fileInput}
                            type="file"
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                    </Grid>
                    <Grid item xs sx={{ p: 2 }}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary">
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default SignUp