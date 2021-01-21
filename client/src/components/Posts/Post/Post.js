import React from 'react';
import useStyles from "./styles";

import {Card, CardActions, CardContent, CardMedia,Button,Typography} from '@material-ui/core';


const Post = ({post})=> {
    const classes = useStyles();
    return (
        <Card classNam={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
            </div>
        </Card>
    )
}

export default Post;