import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    rollNo:{
        type: String,
        required: true,
        unique: true,
    },
    department:{
        type: String,
        
    },
    year:{
        type: Number,
        
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phone:String,
    address:String,
    dob: Date,
})
const Student = mongoose.model("Student",studentSchema);
export default Student;