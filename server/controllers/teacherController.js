import Teacher from "../models/Teacher.js";

export const createTeacher = async (req, res) => {
    try {
        // console.log("Creating teacher with data:", req.body);
        // console.log("upload file",req.file);
        
        
        const { email } = req.body;
        // Check if teacher already exists
        const existingTeacher = await Teacher.findOne({ email});
        if (existingTeacher) {
            return res.status(400).json({ message: "Teacher with this email already exists" });
        }
        const newTeacher = new Teacher(req.body);
        await newTeacher.save();
        res.status(201).json(newTeacher);
    }catch(error){
        // console.log("Error creating teacher:", error);
        
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}   

export const updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findOneAndUpdate({employeeId: req.params.id}, req.body, {new: true});
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
