import Student from "../models/Student.js";

// Create a new student
export const createStudent = async (req, res) => {
    try{
        const {email}= req.body;
        // Check if student already exists
        const existingStudent = await Student.findOne({email});
        if(existingStudent){
            return res.status(400).json({message: "Student with this email already exists"});
        }

        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message || "Server Error", error });
    }
};

//get all students
export const getAllStudents = async (req,res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message || "Server Error", error });
    }
}

// Get a student by ID
export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message || "Server Error", error });
    }
};

// Update a student by ID
export const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body,{new : true,});
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message || "Server Error", error });
    }
};
// Delete a student by ID
export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message || "Server Error", error });
    }
};