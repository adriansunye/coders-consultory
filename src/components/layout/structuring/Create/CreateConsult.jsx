import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Input, Typography, Paper, Box, TextField, Button } from "@mui/material";
import FileUploader from "./FileUploader";




export default function CreateConsult() {
    const navigate = useNavigate();
    
    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        let value = event.target.files ? event.target.files[0]  : event.target.value;
       
        setInputs(values => ({...values, [name]: value}));
    }


    const handleSubmit = (event) => {
        event.preventDefault();     
        
        const { fileMedia, ...otherInputs } = inputs;
        const body = new FormData();
        // you have to put the images in the same field, and the server will receive an array
        body.append('image', inputs.fileMedia);
        // the other data to send
        const data = {
            ...otherInputs
          }
          const parsedData = JSON.stringify(data);
        body.append('_jsonData', parsedData);

        axios.post('http://localhost:8888/coders-consultory-server/api/user/save', body).then(function(response){
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
                    <Grid item xs={12} sm container>
                        <Grid item xs direction="column" spacing={2}>
                            <Grid item xs>
                                <Box
                                    enctype='multipart/form-data'
                                    component="form"
                                    onSubmit={handleSubmit}
                                    autoComplete="off"
                                >
                                    <div className="form-row">
            <div className="form-group col-md-6">
              <label>Select File :</label>
              <input
                type="file"
                className="form-control"
                name="fileMedia"
                onChange={handleChange}
              />
            </div>
            </div>
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
                                    <TextField
                                        fullWidth
                                        sx={{ my: 1 }}
                                        id="imageInput"
                                        label="image"
                                        onChange={handleChange}
                                        name="image_path"
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