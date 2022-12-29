import axios from "axios"
import React, { useEffect, useState } from "react";
import { BiDotsHorizontalRounded, BiUserCircle } from "react-icons/bi";
import OptionsPopover from "./OptionsPopover";
import { styled, ButtonBase, IconButton, Avatar, Paper, Box, Grid, Typography, Divider, TextField } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareIcon from '@mui/icons-material/Share';
import useAxiosCustom from "../../../../services/Providers/useAxiosCustom";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100',
    borderRadius: '16px'
});

export const TextFieldWrapper = styled(TextField)`
    fieldset {
        border-radius: 16px;
    }
`;

export default function ListUser() {
    const [consults, setConsults] = useState([]);
    const [anchorEl, setAnchorEl] = useState();
    const [destination, setDestination] = useState();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        getConsults();
    }, []);
    function getConsults() {
        axios.get('http://localhost:8888/coders-consultory-server/api/consults/').then(function (response) {
            console.log(response.data);
            setConsults(response.data);
        });
    }
    const deleteConsult = (id) => {
        axios.delete(`http://localhost:8888/coders-consultory-server/api/consults/${id}`).then(function (response) {
            console.log(response.data);
            getConsults();
        });
    }
    const handleClick = (event) => {
        setDestination(event.currentTarget.name)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function daysDifference(date) {
        var diff = new Date().setHours(12) - new Date(date).setHours(12);
        return Math.round(diff / 8.64e7);
    }

    const [data, setData] = useState(null);
    const [todo, isError, isLoading] = useAxiosCustom({
          url: 'http://127.0.0.1:8888/coders-consultory-server/api/',
          method: 'get',
    });

    useEffect(() => {
       if(todo && todo.data) setData(todo.data)
       console.log(data)
    }, [todo]);

    return (
        <>
        {isError && <p>{isError.message}</p>}
                {data && 
            <Box sx={{ m: 1, pb: 8, backgroundColor: "background.default" }}>
                {consults.map((consult, key) =>
                    <Box key={key} display="flex"
                        justifyContent="center"
                        alignItems="center"
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
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                        <Box sx={{ mt: 1, ml: 1 }}>
                                            {consult.user}
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <ButtonBase name={consult.id} aria-describedby={id} variant="contained" onClick={handleClick} >
                                            <BiDotsHorizontalRounded size="2em" />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item container sx={{mt:2}}>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            {consult.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item container>
                                        <Typography variant="body2" gutterBottom>
                                            {consult.description}
                                        </Typography>
                                    </Grid>
                                    <Grid item container>
                                        <Typography variant="body2">
                                            {daysDifference(consult.created_at) === 1 ?
                                                daysDifference(consult.created_at) + " day" :
                                                daysDifference(consult.created_at) + " days"} ago.
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ mt:2, minWidth: 350, maxWidth: 350 }}>
                                    <Img alt="consult image" src={consult.image_path === null ? "placeholder" : consult.image_path} />
                                </Grid>
                                <Grid item xs={10} container>
                                    <IconButton sx={{ mt: 1 }}>
                                        <FavoriteBorderOutlinedIcon />
                                    </IconButton>
                                    <IconButton sx={{ mt: 1 }}>
                                        <TextsmsOutlinedIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item sx={{ mt: 1 }}>
                                    <IconButton >
                                        <ShareIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Divider color="divider" variant="middle" />
                                </Grid>
                                <Grid item xs={12} container sx={{ mt: 2 }}>
                                    <IconButton sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                    <Box component="form"
                                        autoComplete="off"
                                        sx={{ ml: 1, flexGrow: 1 }}>
                                        <TextFieldWrapper fullWidth id="addCommentInput" placeholder="Write a comment..." variant="outlined" />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                )}
                <OptionsPopover deleteConsult={deleteConsult} destination={destination} id={id} open={open} anchorEl={anchorEl} onClose={() => handleClose()} />
            </Box>}
        </>

    )
}
