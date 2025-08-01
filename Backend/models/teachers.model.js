const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  subjectSpeacialities: [
    {
      type: String,
    },
  ],
  email: String,
});

module.exports = mongoose.model("Teacher", teacherSchema);
