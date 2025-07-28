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
  }, []);

  const findStudent = students.find((student) => student._id === studentId);
  return (
    <>
      <Navbar />
      <div className="ms-4 mt-4">
        <h1>Student Detail</h1>
        <p>Name: {findStudent?.name}</p>
        <p>Age: {findStudent?.age}</p>
        <p>Grade: {findStudent?.grade}</p>
        <p>Attendence: {findStudent?.attendance}</p>
        <p>Marks: {findStudent?.marks}</p>
        <Link className="btn btn-warning me-3" to="/addStudent">
          Edit Details
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteStudentAsync(findStudent?._id))}
        >
          Delete
        </button>
      </div>
    </>
  );
};
export default StudentDetail;
