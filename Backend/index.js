const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connection");
const Student = require("./models/students.model");
const Teacher = require("./models/teachers.model");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/students", async (req, res) => {
  const { name, age, grade, marks, attendance, gender } = req.body;

  try {
    const student = new Student({
      name,
      age,
      grade,
      attendance,
      gender,
      marks,
    });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const updatedStudentData = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedStudentData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Teachers

app.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/teachers", async (req, res) => {
  const { name, age, gender, subjectSpeacialities, email } = req.body;
  try {
    const teacher = new Teacher({
      name,
      age,
      gender,
      subjectSpeacialities,
      email,
    });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interval Server error" });
  }
});

app.put("/teachers/:id", async (req, res) => {
  const teacherId = req.params.id;
  const updatedTeacherData = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndDelete(
      teacherId,
      updatedTeacherData,
      { new: true }
    );
    if (!updatedTeacher) {
      res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/teachers/:id", async (req, res) => {
  const teacherId = req.params.id;
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    if (!deletedTeacher) {
      res.status(404).json({ error: "Teacher not found." });
    } else {
      res
        .status(200)
        .json({
          message: "Teacher deleted successfully.",
          teacher: deletedTeacher,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
