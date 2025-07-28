import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { fetchStudents } from "../students/studentsSlice";

const ClassView = () => {
  const disptach = useDispatch();
  const { students } = useSelector((state) => state.students);
  console.log(students);

  useEffect(() => {
    disptach(fetchStudents());
  }, []);
  return (
    <>
      <Navbar />
      <div className="mt-4 ms-4">
        <h1>Class View</h1>
        <label htmlFor="gender" className="me-2">
          Filter by Gender:{" "}
        </label>
        <select id="gender" className="mb-5">
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br />
        <label htmlFor="sort" className="me-2">
          Sort By:{" "}
        </label>

        <select id="sort">
          <option value="name">Name</option>
          <option value="marks">Marks</option>
          <option value="attendance">Attendance</option>
        </select>
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.name} - {student.gender} - {student.marks} -
              {student.attendance}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default ClassView;
