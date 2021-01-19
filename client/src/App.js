import React from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

import posters from './images/posters.png';

const App = ()=> {
    return (
        <Container maxWidth='lg'>
            <AppBar position='static' color='inherit'>
                <Typography variant='h2' align='center'>
                    Posters
                </Typography>
                <img srcSet={posters} alt='posters' height='60' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify='space-between' alignItems='stretch' spacing={4}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>

        </Container>
    )
}

export default App
