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
import AdminDashboardLayout from "../layouts/admin/AdminDashbordLayout";
import AdminDashboard from "../components/ui/admin/AdminDashboard";

export const LOGIN_ROUTE = "/login";
export const STUDENT_DASHBOARD_ROUTE = "/student/dashboard";
export const ADMIN_DASHBOARD_ROUTE = "/admin/dashboard";


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

     {
        element: <AdminDashboardLayout></AdminDashboardLayout>,
        children: [
            {
                path: ADMIN_DASHBOARD_ROUTE,
                element: <AdminDashboard></AdminDashboard>
            }
        ],
    },
]);
