import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import useCoders from '@services/Hooks/useCoders';
import { useNavigate } from "react-router-dom";
import useCoder from '@services/Providers/CoderProvider';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100',
    borderRadius: '16px'
});

export default function ComplexGrid() {
    const { coders, fetchCoders } = useCoders();
    const {setCoder} = useCoder();
    const navigate = useNavigate();
    useEffect(() => {
        fetchCoders();
    }, []);

    const handleClick = (event) => {
        setCoder(event.currentTarget.id)
        navigate("/consult/selectCoder/createConsult")
    };

    return (
        <>
        
        <Box sx={{ m: 1, pb: 8, backgroundColor: "background.default" }}>

        {coders && coders.map((coder, key) =>
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
                        <Grid item sx={{ minWidth: 200, maxWidth: 200 }}>
                            <Img alt={coder.username} src={coder.profile_picture_path} />
                        </Grid>
                        <Grid item xs={12} sm container alignItems="center" sx={{pl:2, mt:1}}>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography align='center' gutterBottom variant="subtitle1" component="div">
                                        Consulta con {coder.username === "andrespatino" ?
                                            "el Maestro Andres Patiño": "la Sensei Rocio Cejudo"}
                                        </Typography>
                                        <Typography align='center' variant="body2" gutterBottom>
                                            Lo veremos en el fullstack...
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                    <Button
                                        onClick={handleClick}
                                        fullWidth
                                        variant="contained"
                                        color="primary">
                                        Make Consult
                                    </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        
                    </Grid>
                </Paper>
            </Box>
        )}
    </Box>
    </>
    )
}