const Students = require('../model/students');

// เพิ่มข้อมูลนักเรียนใน MongoDB
exports.createstudents = async (req, res) => {
    const { std_id, std_name, Grammar, Vocabulary, Reading, Listening, Total, CEFR } = req.body;

    if (!std_id || !std_name || !Grammar || !Vocabulary || !Reading || !Listening || !Total || !CEFR) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const students = new Students({ std_id, std_name, Grammar, Vocabulary, Reading, Listening, Total, CEFR });

    try {
        const newstudents = await students.save();
        res.status(201).json(newstudents); // ส่งข้อมูลนักเรียนที่ถูกสร้างกลับไปที่ client
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ดึงข้อมูลนักเรียนทั้งหมด
exports.getStudents = async (req, res) => {
    try {
        const students = await Students.find(); // ดึงข้อมูลนักเรียนทั้งหมดจาก MongoDB
        res.status(200).json(students); // ส่งข้อมูลกลับไปที่ client
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ดึงข้อมูลนักเรียนเดี่ยวด้วย ID
exports.getStudent = async (req, res) => {
    try {
        const student = await Students.findById(req.params.id); // ดึงข้อมูลนักเรียนตาม ID

        if (!student) return res.status(404).json({ message: 'Student not found' });

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// แก้ไขข้อมูลนักเรียน
exports.updateStudent = async (req, res) => {
    const { std_id, std_name, Grammar, Vocabulary, Reading, Listening, Total, CEFR } = req.body;

    if (!std_id || !std_name || !Grammar || !Vocabulary || !Reading || !Listening || !Total || !CEFR) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const updatedStudent = await Students.findByIdAndUpdate(
            req.params.id,
            { std_id, std_name, Grammar, Vocabulary, Reading, Listening, Total, CEFR },
            { new: true } // ส่งข้อมูลที่อัพเดทกลับไป
        );

        if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });

        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ลบข้อมูลนักเรียน
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Students.findByIdAndDelete(req.params.id); // ลบนักเรียนตาม ID

        if (!student) return res.status(404).json({ message: 'Student not found' });
        
        res.status(200).json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Get logged in student details
exports.getLoggedInStudent = async (req, res) => {
    try {
        const student = await Students.findById(req.user.studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
