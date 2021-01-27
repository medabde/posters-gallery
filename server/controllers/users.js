import mongoose  from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req,res)=>{
    const {emai,password} = req.body;

    try {
        
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const signup = async (req,res)=>{
    try {
     
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};