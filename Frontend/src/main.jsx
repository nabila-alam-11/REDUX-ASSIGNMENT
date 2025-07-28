import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentForm from "./features/students/StudentForm.jsx";
import StudentDetail from "./features/students/StudentDetail.jsx";
import ClassView from "./features/class/ClassView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/addStudent",
    element: <StudentForm />,
  },
  {
    path: "/student/:studentId",
    element: <StudentDetail />,
  },
  {
    path: "/class",
    element: <ClassView />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
