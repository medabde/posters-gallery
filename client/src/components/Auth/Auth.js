import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, {useState} from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {AUTH} from '../../constants/actionTypes';
import {useHistory} from 'react-router-dom';
import {signin,signup} from '../../actions/auth';

import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import dotenv from 'dotenv';


const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''};

function Auth() {
    const classes = useStyles();
    const [isSignup,setIsSignup] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    dotenv.config();
    
    const [formData,setFormData] = useState(initialState);

    const handleSubmit = (e)=>{
        e.preventDefault();

        console.log(formData);
        if(isSignup){
            dispatch(signup(formData,history));
        }else{
            dispatch(signin(formData,history));
        }
    };

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleShowPassword = ()=>{
        setShowPassword((prevShowPassword)=> !prevShowPassword);
    };

    const switchMode =()=>{
        setIsSignup((prevIsSignup)=>!prevIsSignup);
        setShowPassword(false);
    };


    const googleSuccess = async (res) =>{
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type:AUTH,data:{result,token}});
            history.push('/');
        } catch (error) {
            console.error(error);
        }

    };
    const googleError = () =>{
        console.log("Google Sign In was unsuccessful. Try Again Later")
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3} >
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign Up": "Sign In"}</Typography>
            
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastname" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text":"password"} handleShowPassword={handleShowPassword} />
                            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    
                    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>

                    <GoogleLogin
                        clientId="197953966256-1jir21hua3tv2d64m42v1ccilr0r6ei2.apps.googleusercontent.com"
                        render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                            Google Sign In
                        </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode} >
                                {isSignup ? "Already have an account? Sign In":"Don't have an account? Sign Up"}
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;
