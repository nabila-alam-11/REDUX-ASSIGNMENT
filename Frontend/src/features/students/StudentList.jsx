import { Link } from "react-router-dom";
const StudentList = ({ students }) => {
  return (
    <div>
      <h1>Student View</h1>
      <Link to="/addStudent" className="btn btn-warning">
        Add Student
      </Link>
      <div>
        <h2>Student List</h2>
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              <Link to={`/student/${student._id}`}>
                {student.name} (Age: {student.age})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default StudentList;
