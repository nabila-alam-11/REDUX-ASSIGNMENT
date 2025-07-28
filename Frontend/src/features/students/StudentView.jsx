import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./studentsSlice";
import StudentList from "./StudentList";
const StudentView = () => {
  const dispatch = useDispatch();

  const { students, error, status } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <div className="m-4">
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <StudentList students={students} />
    </div>
  );
};
export default StudentView;
