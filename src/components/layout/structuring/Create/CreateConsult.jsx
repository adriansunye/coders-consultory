import { useState, useRef } from "react";
import usePage from "@services/Providers/PageProvider" 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Box, TextField, Button, styled } from "@mui/material";

export default function CreateConsult() {
    const { setPage } = usePage();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const fileInput = useRef();

    const handleChange = (event) => {
        const name = event.target.name;
        let value = event.target.files ? event.target.files[0] : event.target.value;
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
        axios.post('http://localhost:8888/coders-consultory-server/api/user/save', body).then(function (response) {
            console.log(response.data);
            setPage("home")
            navigate('/');
        });
    }

    return (
        <Box fullWidth display="flex"
            justifyContent="center"
            alignItems="center">
            <Paper elevation={5} sx={{
                borderRadius: '16px',
                p: 2,
                mx: 2,
                my: 1,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}>
                
                <Grid container display="flex"
                    justifyContent="center"
                    alignItems="center" spacing={2}>
                    <Grid item sx={{minWidth: 350, maxWidth: 350}}>
                        <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={()=>fileInput.current.click()}
                            >
                                upload file
                        </Button>                            
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs direction="column" spacing={2}>
                            <Grid item xs>
                                <Box
                                    enctype='multipart/form-data'
                                    component="form"
                                    onSubmit={handleSubmit}
                                    autoComplete="off"
                                >   
                                <input 
                                    name="fileMedia"
                                    ref={fileInput} 
                                    type="file" 
                                    onChange={handleChange}
                                    style={{ display: 'none' }} 
                                />
                                
                                    <TextField
                                        fullWidth
                                        sx={{ my: 1 }}
                                        id="titleInput"
                                        multiline
                                        onChange={handleChange}
                                        label="Title"
                                        name="title"
                                        rows={2}
                                    />
                                    <TextField
                                        fullWidth
                                        sx={{ my: 1 }}
                                        multiline
                                        rows={5}
                                        id="descriptionInput"
                                        label="Description"
                                        onChange={handleChange}
                                        name="description"
                                    />
                                    <TextField
                                        fullWidth
                                        sx={{ my: 1 }}
                                        id="userInput"
                                        label="User"
                                        onChange={handleChange}
                                        name="user"
                                    />
                                    <Box>
                                        <Button
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                            color="primary">
                                            Create Consult
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}