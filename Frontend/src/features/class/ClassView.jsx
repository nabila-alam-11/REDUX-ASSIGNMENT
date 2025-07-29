import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { fetchStudents, setFilter, setSortBy } from "../students/studentsSlice";

const ClassView = () => {
  const dispatch = useDispatch();
  const { students, status, filter, sortBy } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const filteredStudents = students.filter((student) => {
    if (filter === "All") return true;
    return student.gender === filter;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "marks") return b.marks - a.marks;
    if (sortBy === "attendance") return b.attendance - a.attendance;
    return 0;
  });

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };
  return (
    <>
      <Navbar />
      <div className="mt-4 ms-4">
        <h1>Class View</h1>
        <label htmlFor="gender" className="me-2">
          Filter by Gender:{" "}
        </label>
        <select
          id="gender"
          className="mb-3"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br />
        <label htmlFor="sort" className="me-2 mb-3">
          Sort By:{" "}
        </label>

        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="marks">Marks</option>
          <option value="attendance">Attendance</option>
        </select>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {sortedStudents.map((student) => (
              <li key={student._id}>
                {student.name} - {student.gender} - Marks: {student.marks} -
                Attendance: {student.attendance}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
export default ClassView;
