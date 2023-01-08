import { Box, IconButton, Container, Typography, Grid, Button, InputLabel, FormControl, OutlinedInput, InputAdornment, styled } from "@mui/material"
import usePage from "@services/Providers/PageProvider"
import useUsername from "@services/Providers/UsernameProvider";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { TextFieldWrapper } from "../Home/ListConsults";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '50',
    borderRadius: '16px'
});

const SignUp = () => {
    const { setPage } = usePage();
    const { setUsername } = useUsername();
    const [error, setError] = useState({
        username: '',
        email: '',
        passwordToCheck: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const fileInput = useRef();
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [invalid, setInvalid] = useState({ title: false, description: false })

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
        else {
            setInvalid(values => ({ ...values, [name]: invalid.name ? true : false }));
        }
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isEmpty = Object.values(error).some(err => err !== "")
        if (!isEmpty) {
            const { fileMedia, ...otherInputs } = inputs;
            const body = new FormData();
            body.append('image', inputs.fileMedia);
            const data = { ...otherInputs }
            const parsedData = JSON.stringify(data);
            body.append('_jsonData', parsedData);
            setUsername(inputs.user)

            axios.post('http://localhost:8888/coders-consultory-server/api/users', body).then(function (response) {
                setUsername(inputs.user)
                setPage("home")
                navigate("/")
            });
        }
    }

    const handleInvalid = (event) => {
        const name = event.target.name;
        setInvalid(values => ({ ...values, [name]: invalid.name ? false : true }));
    }

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "passwordToCheck":
                    if (inputs.password && value !== inputs.password) {
                        stateObj["password"] = "Password and Confirm Password does not match.";
                        setInvalid(values => ({ ...values, [name]: invalid.name ? false : true }));
                    } else {
                        setInvalid(values => ({ ...values, [name]: invalid.name ? true : false }));
                        stateObj["password"] = inputs.password ? "" : error.password;
                    }
                    break;

                case "password":
                    if (inputs.passwordToCheck && value !== inputs.passwordToCheck) {
                        setInvalid(values => ({ ...values, [name]: invalid.name ? false : true }));
                        stateObj[name] = "Password and Confirm Password does not match.";
                    } else {
                        setInvalid(values => ({ ...values, [name]: invalid.name ? true : false }));
                        stateObj[name] = inputs.password ? "" : error.password;
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
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
                        onClick={() => setPage("login")}
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

                <Grid sx={{ p: 4, flexGrow: 1 }}>
                    <Grid container display="flex" alignItems="center">
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Create New Account</Typography>
                    </Grid>
                    <Grid container display="flex" alignItems="center">
                        <Typography variant="body">Set up your username and passward. You can change it later.</Typography>
                    </Grid>
                    <Grid item container sx={{ mt: 2 }}>
                        <TextFieldWrapper
                            error={invalid.user}
                            onInvalid={handleInvalid}
                            required
                            autoComplete="off"
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
                            error={invalid.email}
                            onInvalid={handleInvalid}
                            required
                            fullWidth
                            autoComplete="off"
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
                                error={invalid.passwordToCheck}
                                onInvalid={handleInvalid}
                                onBlur={validateInput}
                                required
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
                            />{error.passwordToCheck && <span className='err'>{error.passwordToCheck}</span>}
                        </FormControl>
                    </Grid>
                    <Grid item container sx={{ mt: 2 }}>
                        <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password-confirm">Confirm Password</InputLabel>
                            <OutlinedInput fullWidth
                                error={invalid.password}
                                onInvalid={handleInvalid}
                                onBlur={validateInput}
                                required
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
                            />{error.password && <span className='err'>{error.password}</span>}
                        </FormControl>
                        <Grid item xs container>
                            <Button onClick={() => fileInput.current.click()} sx={{ p: 2 }}>
                                Add Picture
                            </Button>
                        </Grid>
                        <input
                            name="fileMedia"
                            ref={fileInput}
                            type="file"
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                        <Grid container display="flex"
                            justifyContent="center"
                            alignItems="center" >
                            <Grid item xs={12} sm container>
                                <Grid item xs >
                                    <Grid item sx={{ minWidth: 100, maxWidth: 100 }}>
                                        {selectedFile && <Img alt="consult image" src={preview} />}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
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