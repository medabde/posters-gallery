import React,{useState,useEffect} from 'react';
import {AppBar,Avatar,Toolbar,Typography,Button} from '@material-ui/core';
import {Link,useHistory,useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import useStyles from './styles';
import posters from '../../images/posters.png';
import { LOGOUT } from '../../constants/actionTypes';


function Navbar() {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token;

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = ()=>{
        dispatch({type:LOGOUT});
        history.push('/');
        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>
                Posters
            </Typography>
            <img className={classes.image} srcSet={posters} alt='posters' height='60' />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name} </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
            </AppBar>  
    );
}

export default Navbar
