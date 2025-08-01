import express from 'express';

import { createCourse,getAllCourses,getCourseById,updateCourse,deleteCourse } from '../controllers/courseController.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;
