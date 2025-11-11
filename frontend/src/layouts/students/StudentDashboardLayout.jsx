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
    const {setUser  , setAuthenticated , logout , authenticated} = useContext(UserStateContext)
    const [isLoading , setisLoading] = useState(true)
    

    useEffect(() => {
        if(authenticated === true){
            setisLoading(false)
             UserApi.getUser().then(({data}) => {
            setUser(data)
            setAuthenticated(true)
            
        }).catch(() => {
           logout()
             
        })
        } else {
            navigate(LOGIN_ROUTE)
        }
       
    },[authenticated]);
    
    if(isLoading){
        return <></>
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
                    <div className={'w-100 md:w-1/4'}><StudentAdministrationSideBar/>
                    </div>
                    <div className={'w-100 md:w-3/4'}><Outlet></Outlet>
                    </div>
                </div>
                
                
                <br />
               
            </main>
            <footer>fouter</footer>
        </>
    );
}
