import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, Typography, Paper, Box, TextField, Button } from "@mui/material";
import { deepPurple } from '@mui/material/colors';

export default function UpdateConsult() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        getConsult();
    }, []);
    function getConsult() {
        axios.get(`http://localhost:8888/coders-consultory-server/api/user/${id}`).then(function (response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs)
        axios.put(`http://localhost:8888/coders-consultory-server/api/user/${id}/edit`, inputs).then(function (response) {
            console.log(response.data);
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
                <Typography gutterBottom variant="subtitle1" component="div">
                    Edit consult by user: {inputs.user}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <TextField
                    fullWidth
                        sx={{ my: 1 }}
                        id="titleInput"
                        multiline
                        onChange={handleChange}
                        label="Title"
                        name="title"
                        value={inputs.title}
                        rows={2}
                    />
                    <TextField
                    fullWidth
                        sx={{ my: 1 }}
                        multiline
                        rows={5}
                        id="descriptionInput"
                        label="Description"
                        value={inputs.description}
                        onChange={handleChange}
                        name="description"
                    />
                    <TextField
                    fullWidth
                        sx={{ my: 1 }}
                        multiline
                        id="imageInput"
                        label="Image"
                        rows={1}
                        value={inputs.image_path}
                        onChange={handleChange}
                        name="image_path"
                    />
                    <Box> 
                        <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary">
                            Edit Consult
                        </Button>
                    </Box>
                    
                </Box>
            </Paper>
        </Box>
    )
}