import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, styled, Typography, Paper, Box, Avatar, Button, IconButton, ButtonBase } from "@mui/material";
import OptionsPopover from "../Home/OptionsPopover";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TextFieldWrapper } from "../Home/ListConsults";
import useUserData from "@services/Providers/useUserData";




const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '16px'
});

export default function UpdateConsult() {
    const { userData, fetchUser } = useUserData();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const { id } = useParams();
    const [anchorEl, setAnchorEl] = useState();
    const [destination, setDestination] = useState();
    const open = Boolean(anchorEl);
    const idPopover = open ? 'simple-popover' : undefined;
    useEffect(() => {
        fetchUser();
        getConsult();
    }, []);
    function getConsult() {
        axios.get(`http://localhost:8888/coders-consultory-server/api/consults/${id}`).then(function (response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }
    const deleteConsult = (id) => {
        axios.delete(`http://localhost:8888/coders-consultory-server/api/consults/${id}`).then(function (response) {
            console.log(response.data);
            navigate('/');
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs)
        axios.put(`http://localhost:8888/coders-consultory-server/api/consults/${id}`, inputs).then(function (response) {
            console.log(response.data);
            navigate('/');
        });
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handleClick = (event) => {
        setDestination(event.currentTarget.name)
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    
    return (
        <Box sx={{ m: 1, backgroundColor: "background.default" }}>
            <Box display="flex"
                justifyContent="center"
                alignItems="center"
                component="form"
                                    onSubmit={handleSubmit}
                                    autoComplete="off"
            >
                <Paper elevation={5} sx={{
                    borderRadius: '13px',
                    p: 2,
                    mx: 2,
                    my: 1,
                    flexGrow: 1,
                    backgroundColor: "background.paper"
                }}>
                    <Grid container display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} container >
                            <Grid item xs container>
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar alt={userData && userData.username} src={userData && userData.profile_picture_path} />
                                </IconButton>
                                <Box sx={{ mt: 1, ml: 1 }}>
                                    {inputs.user}
                                </Box>
                            </Grid>
                            <Grid item>
                                <ButtonBase name={inputs.id} aria-describedby={idPopover} variant="contained" onClick={handleClick} >
                                    <BiDotsHorizontalRounded size="2em" />
                                </ButtonBase>
                            </Grid>
                            <Grid item container sx={{ mt: 2 }}>
                                <TextFieldWrapper
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
                            </Grid>
                            <Grid item container>
                                <TextFieldWrapper
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
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container >
                    <Grid item xs container sx={{ p: 2 }}>
                    <Typography variant="body2">
                                Last updated at: {inputs.updated_at === '0000-00-00 00:00:00' ? inputs.created_at : inputs.updated_at}
                            </Typography>
                    </Grid>
                    <Grid item xs sx={{ p: 2 }}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary">
                            Update Consult
                        </Button>
                    </Grid>
                </Grid>
                    </Grid>
                </Paper>
            </Box>
            <OptionsPopover deleteConsult={deleteConsult} onClose={() => handleClose()} destination={destination} open={open} id={idPopover} anchorEl={anchorEl} />
        </Box>
    )
}

