import { Outlet , Link, useNavigate } from "react-router-dom";
import { STUDENT_DASHBOARD_ROUTE } from "../router";
import { useContext, useEffect } from "react";
import { UserStateContext } from "../context/UserContext";

export default function GuestLayout() {

    const navigate = useNavigate()
    const context = useContext(UserStateContext)
    

    useEffect(() => {
        if(context.authenticated){
        navigate(STUDENT_DASHBOARD_ROUTE)
    }
    })

    
  return (

    <>
    
    <header className={'container'}>
         <nav className="hidden md:flex space-x-6">
        <Link to={'/'} className="text-gray-600 hover:text-gray-900">Home</Link>
        <Link to={'/login'} className="text-gray-600 hover:text-gray-900">Login</Link>
        <Link  to={'/register'} className="text-gray-600 hover:text-gray-900">Register</Link>
        <Link to={'/users'} className="text-gray-600 hover:text-gray-900">Users</Link>
      </nav>
    </header>
    <main>
     
    <Outlet></Outlet>
    </main> 
    <footer>fouter</footer>
    </>

  )
   
}

