import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../app/features/ui/AppLayout";
import ErrorPage from "../app/features/ui/ErrorPage";
import { lazy } from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import UserProfile from "../app/features/user/UserProfile";
import CoursePreview from "../app/features/course/coursePreview/CoursePreview";
import Course from "../app/features/course/courseView/Course";
import MyCourses from "../app/features/course/myLearning/MyCourses";
import ExploreCourses from "../app/features/course/exploreCourses/ExploreCourses";
import InstructorOnlyRouter from "./InstructorOnlyRouter";
import CreateCourse from "../app/features/course/courseDashboard/createCourse/CreateCourse";
import EditCourses from "../app/features/course/courseDashboard/editCourses/EditCourses";
import EditCourse from "../app/features/course/courseDashboard/editCourses/EditCourse";
import CreateSection from "../app/features/course/courseDashboard/createSection/CreateSection";
import CreateLesson from "../app/features/course/courseDashboard/createLesson/CreateLesson";
import CodeEditor from "../app/features/ui/codeEditor/CodeEditor";
import EditSection from "../app/features/course/courseDashboard/editSection/EditSection";
import EditLesson from "../app/features/course/courseDashboard/editLesson/EditLesson";
import Payment from "../app/features/payment/Payment";
import PlacementTest from "../app/features/course/courseDashboard/placement test/PlacementTest";
import TakePlacementTest from "../app/features/course/placementTest/TakePlacementTest";

// Lazy-loaded components
const Signup = lazy(() => import("../app/features/auth/signup/Signup"));
const Login = lazy(() => import("../app/features/auth/login/Login"));
const Home = lazy(() => import("../app/features/home/Home"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "*", element: <ErrorPage /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/profile", element: <UserProfile /> },
          { path: "/courses/:id", element: <Course /> },
          { path: "/courses/myCourses", element: <MyCourses /> },
          { path: "/codeEditor", element: <CodeEditor /> },
          { path: "/payment", element: <Payment /> }
        ],
      },
      { path: "/courses/explore-courses", element: <ExploreCourses /> },
      { path: "/courses/preview/:courseId", element: <CoursePreview /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },

      {
        element: <InstructorOnlyRouter />,
        children: [
          { path: "/courses/create", element: <CreateCourse /> },
          { path: "/courses/manage", element: <EditCourses /> },
          { path: "/courses/manage/edit/:courseId", element: <EditCourse /> },
          { path: "/section/manage/edit/:courseId", element: <EditSection /> },
          { path: "/lesson/manage/edit/:courseId", element: <EditLesson /> },
          { path: "/courses/section/create", element: <CreateSection /> },
          { path: "/courses/lesson/create", element: <CreateLesson /> },
          { path: "/create/placement-test/:courseId", element: <PlacementTest /> },
          { path: "placement-test/:courseId", element: <TakePlacementTest /> }
        ]
      }
    ],
  },
]);



export default router;