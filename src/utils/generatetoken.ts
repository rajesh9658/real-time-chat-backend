import jwt from "jsonwebtoken";


const generatetoken = (id:string)=>{
    return jwt.sign({id},process.env.JWT_SECRET as string,{expiresIn:'1h'});
}

export default generatetoken;