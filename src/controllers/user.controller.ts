import { Request, Response } from 'express'
import UserModel, { IUser } from '../models/user.model'
import { sign } from 'jsonwebtoken'

export const signup = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, email, password } = req.body;
        const userSignup: IUser = new UserModel({ username, email, password });        
        const user: IUser = await userSignup.save();

        return res.json({
          mes: "signup success",
          user,
        });

    } catch (e) {
        return res.json({
            mes: "signup failed",
            err: e + ' '
        });
    }
}
export const signin = async (req: Request, res: Response): Promise<Response> => {

    const { email, password } = req.body
    const user: IUser | null = await UserModel.findOne({ email })
    if(!user) {
        return res.json({
            mes: "Not found user",
            err: true
        })
    }
    
    const isMatch: Boolean = await user.comparePassWord(password)
    if (!isMatch) {
        return res.json({
            mes: "Invalid password",
            err: true
        });
    }
    const token: string = await sign({ id: user._id, username: user.username }, (process.env.SECRET_JWT as string))
    return res.json({
        token,
        err: false
    });

}
export const profile = (req: any, res: Response): Response => {
    return res.json({
        user:req.user
    })
};

