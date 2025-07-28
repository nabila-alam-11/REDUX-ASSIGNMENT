import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { addStudentAsync } from "./studentsSlice";

const StudentForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age || !grade || !gender) {
      setError("Please fill in all fields.");
      return;
    }

    const newStudent = {
      name,
      age: parseInt(age),
      grade,
      gender,
    };

    try {
      dispatch(addStudentAsync(newStudent));

      setName("");
      setAge("");
      setGender("");
      setGrade("");
      setError("");
    } catch (err) {
      setError("Failed to add student. Try again");
    }
  };
  return (
    <>
      <Navbar />
      <div className="ms-4 mt-4">
        <h1>Add Student</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="mb-4 form-control"
            style={{ width: "20rem" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            className="mb-4 form-control"
            style={{ width: "20rem" }}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            placeholder="Grade"
            className="mb-4 form-control"
            style={{ width: "20rem" }}
            onChange={(e) => setGrade(e.target.value)}
            value={grade}
          />
          Gender:{" "}
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />{" "}
            Male
          </label>
          &nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "female"}
            />{" "}
            Female
          </label>
          <br />
          <button className="btn btn-primary mt-4" type="submit">
            Add Student
          </button>
        </form>
      </div>
    </>
  );
};
export default StudentForm;
