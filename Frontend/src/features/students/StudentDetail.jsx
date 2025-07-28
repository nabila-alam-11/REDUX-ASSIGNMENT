import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteStudentAsync, fetchStudents } from "./studentsSlice";

const StudentDetail = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const findStudent = students.find((student) => student._id === studentId);

  return (
    <>
      <Navbar />
      <div className="ms-4 mt-4">
        <h1>Student Detail</h1>
        {findStudent ? (
          <div>
            <p>Name: {findStudent.name}</p>
            <p>Age: {findStudent.age}</p>
            <p>Grade: {findStudent.grade}</p>
            <p>Attendance: {findStudent.attendance}</p>
            <p>Marks: {findStudent.marks}</p>
            <Link
              className="btn btn-warning me-3"
              to={`/editStudent/${findStudent._id}`}
            >
              Edit Details
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => dispatch(deleteStudentAsync(findStudent._id))}
            >
              Delete
            </button>
          </div>
        ) : (
          <p>No data found.</p>
        )}
      </div>
    </>
  );
};

export default StudentDetail;
