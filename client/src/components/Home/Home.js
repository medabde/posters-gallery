import React,{useEffect,useState} from 'react';

import {Container, Grow, Grid} from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import {useDispatch} from 'react-redux';
import {getPosts} from '../../actions/posts';
import useStyles from '../../styles';

function Home() {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch]);


    return (
        <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    );
}

export default Home
