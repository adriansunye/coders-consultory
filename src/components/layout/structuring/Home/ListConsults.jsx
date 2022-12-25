import axios from "axios"
import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import OptionsPopover from "./OptionsPopover";
import { styled, ButtonBase, Typography, Paper, Box, Grid} from '@mui/material';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

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
        axios.get('http://localhost:8888/coders-consultory-server/api/users/').then(function (response) {
            console.log(response.data);
            setConsults(response.data);
        });
    }
    const deleteConsult = (id) => {
        axios.delete(`http://localhost:8888/coders-consultory-server/api/user/${id}/delete`).then(function (response) {
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

    return (
        <>
            {consults.map((consult, key) =>
                <Box key={key} display="flex"
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
                            <Grid item sx={{maxWidth: 350}}>
                                <Img alt="consult image" src={consult.image_path === null ? "placeholder" : consult.image_path} />
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            {consult.title}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {consult.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {consult.user}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                            {consult.created_at}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                <ButtonBase name={consult.id} aria-describedby={id} variant="contained" onClick={handleClick} >
                                    <BiDotsVerticalRounded size="2em" />
                                </ButtonBase>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            )}
            <OptionsPopover deleteConsult={deleteConsult} destination={destination} id={id} open={open} anchorEl={anchorEl} onClose={() => handleClose()} />
        </>
    )
}