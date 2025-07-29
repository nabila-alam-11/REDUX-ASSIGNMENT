import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { fetchStudents } from "../students/studentsSlice";

const SchoolView = () => {
  const dispatch = useDispatch();
  const { students, status } = useSelector((state) => state.students);

  const [schoolStats, setSchoolStats] = useState({
    totalStudents: 0,
    averageMarks: 0,
    averageAttendance: 0,
    topStudent: null,
  });

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (students.length === 0) return;

    const totalStudents = students.length;

    const averageMarks =
      students.reduce((sum, student) => {
        return sum + student.marks;
      }, 0) / totalStudents;

    const averageAttendance =
      students.reduce((sum, student) => {
        return sum + student.attendance;
      }, 0) / totalStudents;

    const topStudent = students.reduce((top, student) => {
      return student.marks > (top?.marks ?? 0) ? student : top;
    }, null);

    setSchoolStats({
      totalStudents,
      averageMarks,
      averageAttendance,
      topStudent,
    });
  }, [students]);

  return (
    <>
      <Navbar />
      <div className="ms-4 mt-4">
        <h1>School View</h1>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>Total Students: {schoolStats.totalStudents}</p>
            <p>
              Average Attendance: {schoolStats.averageAttendance.toFixed(2)}
            </p>
            <p>Average Marks: {schoolStats.averageMarks.toFixed(2)}</p>
            {schoolStats.topStudent && (
              <p>Top Student: {schoolStats.topStudent.name}</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default SchoolView;
