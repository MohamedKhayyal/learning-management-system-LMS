import CallToAction from "../../components/student/CallToAction";
import CourseSection from "../../components/student/CourseSection";
import Hero from "../../components/student/Hero";
import Testimonial from "../../components/student/testimonial";

export default function Home() {
  return (
    <div>
      <Hero />
      <CourseSection />
      <Testimonial />
      <CallToAction />
    </div>
  );
}
