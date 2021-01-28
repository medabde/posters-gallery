import mongoose  from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

export const signin = async (req,res)=>{
    const {email,password} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({message:"User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        
        if(!isPasswordCorrect) return res.status(400).json({message:"Password Incorrect."});

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},process.env.SECRET_JWT_KEY,{expiresIn: "1h"});

        res.status(200).json({result: existingUser,token});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const signup = async (req,res)=>{

    const {email,password,confirmPassword,firstname,lastname} = req.body;

    try {

        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message:"User already exists."});

        if(password !== confirmPassword) return res.status(400).json({message:"Passwords don't match."});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({email,password:hashedPassword,name:`${firstname} ${lastname}`});
     
        const token = jwt.sign({email:result.email,id:result._id},process.env.SECRET_JWT_KEY,{expiresIn: "1h"});

        res.status(200).json({result,token});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};