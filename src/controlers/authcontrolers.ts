import { Request, Response } from "express";
import User from "../models/user";
import { request } from "http";
import bcrypt from 'bcryptjs';
import generatetoken from "../utils/generatetoken";
import { promises } from "dns";

export const registerUser = async (req: Request, res: Response):Promise<any> => {
 const {name, email, password} = req.body;

 try {
    const userExist = await User.findOne({email: email});
    if (userExist) {
        return res.status(400).json({message:"user allrady exits"});
    }
    const hashpassword = await bcrypt.hash(password,10);
    const user = new User({name, email, password:hashpassword});
    res.status(201).json({
        message:"user created successfully",
        _id:user._id,
        email:user.email,
        name:user.name,
        // token:generatetoken(user._id as unknown as string)
    });

    
 }catch(error ){
    res.status(500).json({message:"something went wrong"});

 }

}

export const Loginuser = async(req:Request,res:Response):Promise<any>=>{

    const {email,password} = req.body;

    try {
        const user = await User.findOne({email:email});
        if (!user){
            return res.status(400).json({message :"user not found"});
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if (!isPasswordMatch){
            return res.status(401).json({message:"password is incorrect"})
        }

        res.status(200).json({
            message:"user loggedin successfully",
            _id:user._id,
            email:user.email,
            name:user.name,
            token:generatetoken(user._id as unknown as string)
        });
        
    } catch (error) {
        res.status(500).json({message:"something went wrong"});
    }
};