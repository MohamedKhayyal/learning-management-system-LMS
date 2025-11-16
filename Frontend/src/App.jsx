import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/student/Home";
import Navbar from "./components/student/Navbar";
import Footer from "./components/student/Footer";
import SignIn from "./pages/student/SignIUp";
import Login from "./pages/student/LogIn";
import CourseListPage from "./pages/student/CourseList";
import ScrollToTop from "./components/student/ScrollToTop";
import Educator from "./pages/educator/Educator";
import NotFound from "./pages/student/NotFound";
import CourseDetails from "./pages/student/CourseDetails";

export default function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/course-list" element={<CourseListPage />} />
          <Route path="/courses/:id" element={<CourseDetails />} />

          <Route path="/admin/*" element={<Educator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}
