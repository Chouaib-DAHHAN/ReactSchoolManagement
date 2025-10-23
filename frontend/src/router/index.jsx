import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import NotFound from "../pages/NotFound";
import Layout from "../layouts/Layout";
import GuestLayout from "../layouts/GuestLayout";
import StudentDashboardLayout from "@/layouts/students/StudentDashboardLayout";
import StudentDashboard from "../components/ui/Student/StudentDashboard";

export const LOGIN_ROUTE = "/login";
export const STUDENT_DASHBOARD_ROUTE = "/student/dashboard";


export const router = createBrowserRouter([
    {
        element: <Layout></Layout>,

        children: [
            {
                path: "/",
                element: <Home></Home>,
            },


            {
                path: "*",
                element: <NotFound></NotFound>,
            },
        ],
    },

    {
        element: <GuestLayout></GuestLayout>,
        children: [
            {
                path: LOGIN_ROUTE,
                element: <Login></Login>,
            },
        ],
    },

    {
        element: <StudentDashboardLayout></StudentDashboardLayout>,
        children: [
            {
                path: STUDENT_DASHBOARD_ROUTE,
                element: <StudentDashboard></StudentDashboard>
            },
        ],
    },
]);
