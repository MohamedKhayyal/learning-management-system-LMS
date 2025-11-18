import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../components/educator/sidebar";
import AddCourse from "./AddCourse";
import DashboardHome from "./Dashboard";
import Students from "./StudentsEnrolled";
import MyCourses from "./MyCourses";

export default function Educator() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <div className="w-full flex">
          <div className="w-[1px] bg-gray-200" />

          <main className="flex-1">
            <Routes>
              <Route path="dash" element={<DashboardHome />} />
              <Route path="add-course" element={<AddCourse />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="students" element={<Students />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
