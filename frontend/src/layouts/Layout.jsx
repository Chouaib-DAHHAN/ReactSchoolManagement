import { Outlet , Link } from "react-router-dom";

export default function Layout() {
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
    
    </>

  )
   
}

