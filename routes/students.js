const express = require('express');


const authenticateToken = require("../middlewares/auth");

const { getStudents, getStudent, createstudents, updateStudent, deleteStudent,getLoggedInStudent }
= require('../controllers/studentsControllers');

const router = express.Router();

router.get('/students', authenticateToken,getStudents);

router.get('/students/:id', authenticateToken,getStudent);

router.post('/students', authenticateToken,createstudents);

router.put('/students/:id', authenticateToken,updateStudent);

router.delete('/students/:id',  authenticateToken,deleteStudent);

router.get('/student', authenticateToken, getLoggedInStudent);


module.exports = router;