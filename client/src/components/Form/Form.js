import React, {useState, useEffect} from 'react';
import useStyles from "./styles";
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper} from '@material-ui/core';

import {useDispatch,useSelector} from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';


const Form = ({currentId, setCurrentId})=> {
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: ''
    });

    const user = JSON.parse(localStorage.getItem('profile'));

    const post = useSelector(state => currentId ? state.posts.find((p) => p._id === currentId):null);

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
        }else{
            dispatch(createPost({...postData,name:user?.result?.name}));
        }
        clear();
    }
    const clear = () =>{
        setCurrentId(null);
        setPostData({
            title: '', message: '', tags: '', selectedFile: ''
        });


    }

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own posters and like other's posters.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autocomplet="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> {currentId ? "Updating": "Creating "} a Poster</Typography>
                <TextField name="title"  variant="outlined"  label="Title"  fullWidth value={postData.title} onChange={(e)=> setPostData({...postData,title: e.target.value})}/>
                <TextField name="message"  variant="outlined"  label="Message"  fullWidth value={postData.message} onChange={(e)=> setPostData({...postData,message: e.target.value})}/>
                <TextField name="tags"  variant="outlined"  label="Tags"  fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData,tags: e.target.value.split(',')})}/>
                <div className={classes.fileInput}><FileBase type="file"multiple={false}onDone={({base64}) => setPostData({...postData,selectedFile:base64})}/></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;
