import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: {type: String, required: true},
    email :{type:String, reuquired:true},
    password: {type:String, required:true}
},
{
    timestamps: true
});


export default mongoose.model('User', userschema);