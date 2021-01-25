import { Avatar, Container, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';

function Auth() {
    const classes = useStyles();
    const isSignup = false;

    const handleSubmit = ()=>{

    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3} >
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign Up": "Sign In"}</Typography>
            
                <form className={classes.form} onSubmit={handleSubmit()}>
                    <Grid container spacing={2}>
                        
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;
