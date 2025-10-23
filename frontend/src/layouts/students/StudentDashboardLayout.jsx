import { Outlet, Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../router";
import { useContext, useEffect} from "react";
import { StudentStateContext } from "../../context/StudentContext";
import StudentApi from "../../../services/api/student/StudentApi";
import { Button } from "@/components/ui/button"

export default function StudentDashboardLayout() {

    
    const navigate = useNavigate();
    const {setUser  , setAuthenticated , user , logout} = useContext(StudentStateContext)

    useEffect(() => {
        StudentApi.getUser().then(({data}) => {
            setUser(data)
            console.log(data)
            setAuthenticated(true)
            
        }).catch(() => {
           logout()
             navigate(LOGIN_ROUTE)
        })
    },[]);

    const logoutCallback = async () => {
       StudentApi.logout().then(() => {
        logout()
        navigate(LOGIN_ROUTE)
       })
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
                   <Button onClick={logoutCallback}>Logout</Button>
                   </li>
                </nav>
            </header>

            <main>
                <Outlet></Outlet>
                <br />
                

                <div className="overflow-x-auto">
                    
                    <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                  ID
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                   Name  
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                   Email
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                    date de creation
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-600">
                                {user.id}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-600">
                                    {user.name}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-600">
                                     {user.email}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-600">
                                    {user.created_at}
                                </td>
                            </tr>
                            
                            
                        </tbody>
                    </table>
                </div>
            </main>
            <footer>fouter</footer>
        </>
    );
}
