import { Outlet, Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../router";
import { useContext, useEffect, useState} from "react";
import { UserStateContext } from "../../context/UserContext";
import UserApi from "../../../services/api/student/UserApi";
import { Button } from "@/components/ui/button"
import StudentDropDownMenu from "./StudentDropDownMenu";
import { StudentAdministrationSideBar } from "./administration/StudentAdministrationSideBar";

export default function StudentDashboardLayout() {
    const navigate = useNavigate();
    const { user, setUser, setAuthenticated, logout, authenticated, token } = useContext(UserStateContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // If we already have user data from login, use it directly
        if (user && user.role) {
            setIsLoading(false);
            if (user.role !== 'student') {
                console.log('Non-student user in student dashboard, redirecting to appropriate dashboard...');
                if (user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate(LOGIN_ROUTE);
                }
            }
            return;
        }

        // If no token or authentication, redirect to login
        if (!token && !authenticated) {
            navigate(LOGIN_ROUTE);
            return;
        }

        // Fetch user data from API
        const fetchUserData = async () => {
            try {
                const response = await UserApi.getUser();
                const userData = response.data;
                
                setUser(userData);
                setAuthenticated(true);
                setIsLoading(false);
                
                // Check if user is actually a student
                if (userData.role !== 'student') {
                    console.log('API returned non-student user for student dashboard, redirecting...');
                    if (userData.role === 'admin') {
                        navigate('/admin/dashboard');
                    } else {
                        logout();
                    }
                }
            } catch (error) {
                console.error('Failed to fetch user data in student layout:', error);
                
                // Handle specific error cases
                if (error.response?.status === 429) {
                    // Rate limit - use fallback: check if we have any user data in context
                    if (user) {
                        setIsLoading(false);
                    } else {
                        // Wait a bit and try again once
                        setTimeout(async () => {
                            try {
                                const retryResponse = await UserApi.getUser();
                                const retryData = retryResponse.data;
                                setUser(retryData);
                                setAuthenticated(true);
                                setIsLoading(false);
                                
                                if (retryData.role !== 'student') {
                                    navigate('/admin/dashboard');
                                }
                            } catch (retryError) {
                                console.error('Retry also failed:', retryError);
                                logout();
                            }
                        }, 2000);
                    }
                } else if (error.response?.status === 401 || error.response?.status === 403) {
                    // Unauthorized or Forbidden - redirect to login
                    logout();
                } else {
                    // Other errors - use context data if available
                    if (user) {
                        setIsLoading(false);
                    } else {
                        logout();
                    }
                }
            }
        };

        fetchUserData();
    }, [token, authenticated, navigate, setUser, setAuthenticated, logout, user]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Loading student dashboard...</div>
            </div>
        );
    }

    // Final safety check
    if (!user || user.role !== 'student') {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Access denied. Redirecting...</div>
            </div>
        );
    }

    return (
        <>
            <header className={"container"}>
                <nav className="hidden md:flex space-x-6">
                    <Link
                        to={"/"}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Home
                    </Link>
                    <Link
                        to={"/login"}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Login
                    </Link>
                    <Link
                        to={"/register"}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Register
                    </Link>
                   <li className="ml-4 px-2 py-1">
                    <StudentDropDownMenu/>
                   </li>
                </nav>
            </header>

            <main className={'container'}>
                <div className="flex">
                    <div className={'w-100 md:w-1/4'}>
                        <StudentAdministrationSideBar/>
                    </div>
                    <div className={'w-100 md:w-3/4'}>
                        <Outlet/>
                    </div>
                </div>
            </main>
            
        </>
    );
}