import { Request, Response } from 'express'
import User, { IUser } from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import { use } from 'passport';

function createTocken(user: IUser) {
        return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, { expiresIn: 86400
    });
}

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    //console.log(req.body)
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: 'Please, send your email and password.' })
    }
    const user = await User.findOne({ email: req.body.email });
    //console.log(user)
    if (user) {
        return res.status(400).json({msg: `This user ${user.email} is already created.`})
        //return res.status(400).json({ msg: 'This user is already created.'});
    }
    const newUser = new User(req.body)
    await newUser.save();
    return res.status(201).json(newUser);
}

export const signIn = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({msg: 'Please, send your email and password.'})
    }
    
    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(400).json({msg: `This user ${req.body.email} does not exist.`});
    }

    const isMatch = await user.comparePassword(req.body.password)
    if (isMatch) {
        return res.status(200).json({token: createTocken(user)})
    }
    return res.status(400).json({msg: 'The email or password is incorrect, try again.'});
}