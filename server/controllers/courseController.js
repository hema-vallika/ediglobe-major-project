import express from "express";
import Course from "../models/Course.js";

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor');
        res.status(200).json(courses);
    } catch (error) {
        // console.log(error);
        
        res.status(500).json({ message: "Server error" });
    }
}

export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('instructor');
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const createCourse = async (req, res) => {
    try {
        const { courseCode } = req.body;
        // Check if course with the same courseCode already exists
        const existingCourse = await Course.findOne({ courseCode });
        if (existingCourse) {
            return res.status(400).json({ message: "Course with this ID already exists" });
        }
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('instructor');
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}