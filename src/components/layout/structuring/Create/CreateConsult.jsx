import { useState, useRef, useEffect } from "react";
import usePage from "@services/Providers/PageProvider"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Box, InputAdornment, IconButton, Avatar, Divider, Button, styled } from "@mui/material";
import { TextFieldWrapper } from "../Home/ListConsults";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '350px',
    maxHeight: '100',
    borderRadius: '16px'
});

export default function CreateConsult() {
    const { setPage } = usePage();
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
        axios.post('http://localhost:8888/coders-consultory-server/api/consults', body).then(function (response) {
            console.log(response.data);
            setPage("home")
            navigate('/');
        });
    }

    return (

        <>
            <Box sx={{ m: 1 }} fullWidth
                justifyContent="center"
                alignItems="center"
                enctype='multipart/form-data'
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <Paper elevation={5} sx={{
                    borderRadius: '16px',
                    mx: 2,
                    my: 2,
                    flexGrow: 1,
                    backgroundColor: "background.paper"
                }}>
                    <Grid container display="flex"
                        justifyContent="center"
                        alignItems="center" >
                        <Grid item xs={12} sm container>
                            <Grid item xs direction="column">
                                <Grid item xs>
                                    <TextFieldWrapper
                                        fullWidth
                                        id="titleInput"
                                        multiline
                                        onChange={handleChange}
                                        label="Title"
                                        name="title"
                                        rows={2}
                                    />
                                    <input
                                        name="fileMedia"
                                        ref={fileInput}
                                        type="file"
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={5} sx={{
                    borderRadius: '16px',
                    mx: 2,
                    my: 2,
                    flexGrow: 1,
                    backgroundColor: "background.paper"
                }}>
                    <Grid container display="flex"
                        justifyContent="center"
                        alignItems="center" >
                        <Grid item xs={12} sm container>
                            <Grid item xs direction="column" >
                                <Grid item xs>
                                    <TextFieldWrapper
                                        fullWidth
                                        placeholder="What's on your mind?"
                                        multiline
                                        rows={5}
                                        id="descriptionInput"
                                        label="Description"
                                        onChange={handleChange}
                                        name="description"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton sx={{ p: 0, mt: -10 }}>
                                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={5} sx={{
                    borderRadius: '16px',
                    mx: 2,
                    my: 2,
                    flexGrow: 1,
                    backgroundColor: "background.paper"
                }}>
                    <Grid container display="flex"
                        justifyContent="center"
                        alignItems="center" >
                        <Grid item xs={12} sm container>
                            <Grid item xs direction="column">
                                <Grid item xs>
                                    <TextFieldWrapper
                                        fullWidth
                                        id="userInput"
                                        label="User"
                                        onChange={handleChange}
                                        name="user"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <button
                    ref={submitForm}
                    type="submit"
                    style={{ display: 'none' }}
                />
                <Grid container display="flex"
                    justifyContent="center"
                    alignItems="center" >
                    <Grid item xs={12} sm container>
                        <Grid item xs direction="column">
                            <Grid item sx={{ minWidth: 350, maxWidth: 350 }}>
                                {selectedFile && <Img alt="consult image" src={preview} />}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Divider sx={{ mt: 3 }} color="divider" variant="middle" />
            <Grid container display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12} container >
                    <Grid item xs container>
                        <IconButton onClick={() => fileInput.current.click()} sx={{ p: 2 }}>
                            <AddPhotoAlternateOutlinedIcon />
                        </IconButton>
                    </Grid>
                    <Grid item sx={{ p: 2 }}>
                        <Button
                            onClick={() => submitForm.current.click()}
                            fullWidth
                            variant="contained"
                            color="primary">
                            Create Consult
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

        </>

    )
}