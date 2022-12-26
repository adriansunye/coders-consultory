import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, styled, Typography, Paper, Box, TextField, Button } from "@mui/material";
import { deepPurple } from '@mui/material/colors';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

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
                <Grid container display="flex"
                    justifyContent="center"
                    alignItems="center" spacing={2}>
                    <Grid item sx={{ maxWidth: 350 }}>
                        <Img alt="consult image" src={inputs.image_path === null ? "placeholder" : inputs.image_path} />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs direction="column" spacing={2}>
                            <Grid item xs>
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
                                        InputLabelProps={{ shrink: true }}
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
                                        InputLabelProps={{ shrink: true }}
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
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="text.secondary">
                                    {inputs.user}
                                </Typography>
                                <Typography variant="body2">
                                    Last updated at: {inputs.updated_at === '0000-00-00 00:00:00' ? inputs.created_at : inputs.updated_at}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}