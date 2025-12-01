import { Outlet, Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, redirectToDashboard } from "../../router";
import { useContext, useEffect, useState} from "react";
import { UserStateContext } from "../../context/UserContext";
import UserApi from "../../services/api/UserApi";
import { AdminAdministrationSideBar } from "./administration/AdminAdministrationSideBar";
import AdminDropDownMenu from "./AdminDropDownMenu";

export default function AdminDashboardLayout() {
    const navigate = useNavigate();
    const { setUser, setAuthenticated, logout, authenticated} = useContext(UserStateContext);
    const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
    if (authenticated === true) {
      setIsLoading(false)
      UserApi.getUser().then(({data}) => {
        const {role} = data
        if(role !== 'admin') {
          navigate(redirectToDashboard(role));
        }
        setUser(data)
        setAuthenticated(true)
      }).catch(() => {
       logout()
      })
    } else {
      navigate(LOGIN_ROUTE)
    }

  }, [authenticated]);

  if (isLoading) {
    return <></>
  }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Loading admin dashboard...</div>
            </div>
        );
    }

    // Final safety check
   

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
                    <AdminDropDownMenu/>
                   </li>
                </nav>
            </header>

            <main className={'container'}>
                <div className="flex">
                    <div className={'w-100 md:w-1/4'}>
                        <AdminAdministrationSideBar/>
                    </div>
                    <div className={'w-100 md:w-3/4'}>
                        <Outlet/>
                    </div>
                </div>
            </main>
            
        </>
    );
}