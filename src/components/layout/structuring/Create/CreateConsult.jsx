import { useState, useRef, useEffect } from "react";
import usePage from "@services/Providers/PageProvider"
import useUserData from "@services/Hooks/useUserData";
import useCoder from '@services/Providers/CoderProvider';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Box, InputAdornment, IconButton, Avatar, Divider, Button, styled, Typography } from "@mui/material";
import { TextFieldWrapper } from "../Home/ListConsults";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import useUsername from "@services/Providers/UsernameProvider";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '200px',
    maxHeight: '50',
    borderRadius: '16px'
});

export default function CreateConsult() {
    const { setPage } = usePage();
    const { username } = useUsername();
    const { userData, fetchUser } = useUserData();
    const { coder } = useCoder();

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({ coder: coder, username: username });
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [invalid, setInvalid] = useState({title: false, description: false})

    const fileInput = useRef();
    const submitForm = useRef();


    useEffect(() => {
        fetchUser();
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
        else{
            setInvalid(values => ({ ...values, [name]: invalid.name ? true : false }));
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
            setPage("home")
            navigate('/');
        });
    }

    const handleInvalid = (event) => {
        const name = event.target.name;
        setInvalid(values => ({ ...values, [name]: invalid.name ? false : true }));
    }
    return (
        <>
            <Box sx={{ m: 1}} fullWidth
                justifyContent="center"
                alignItems="center"
                enctype='multipart/form-data'
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
            >

                <Typography sx={{
                    p:1,
                    mx: 2,
                    flexGrow: 1,
                }}
                    textAlign="center" gutterBottom variant="subtitle1" component="div">
                    Consulta con {coder === "andrespatino" ?
                        "el Maestro Andres Patiño" : "la Sensei Rocio Cejudo"}
                </Typography>

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
                                        error={invalid.title}
                                        onInvalid={handleInvalid}
                                        required
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
                                        error={invalid.description}
                                        onInvalid={handleInvalid}
                                        required
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
                                                        <Avatar alt={userData && userData.username} src={userData && userData.profile_picture_path} />
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
                            <Grid item sx={{ minWidth: 100, maxWidth: 100 }}>
                                {selectedFile && <Img alt="consult image" src={preview} />}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Divider sx={{ mt: 3 }} color="divider" variant="middle" />
            <Grid sx={{pb:8}} container display="flex"
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