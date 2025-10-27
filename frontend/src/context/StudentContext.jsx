import { createContext, useState } from "react"
import StudentApi from "../../services/api/student/StudentApi"
import { STUDENT_DASHBOARD_ROUTE } from "../router"



export const  StudentStateContext = createContext({
    logout: () => {},
    setUser : () => {},
    user : {},
    authenticated : false,
    login : (email , password) => {},
    setAuthenticated : () => {},

})




export default function StudentContext({children}) {

    const [user , setUser] = useState({})
    const [authenticated , _setAuthenticated] = useState(window.localStorage.getItem('AUTHENTICATED'))
   
    const logout = () => {
      setUser({})
            _setAuthenticated(false)
    }  

    const  login = async (email,password) => {
       await StudentApi.getCSRFToken()
         return StudentApi.login(email,password)
    }

    const setAuthenticated = (isAuthenticated) => {
       _setAuthenticated(isAuthenticated)
       window.localStorage.setItem('AUTHENTICATED' , isAuthenticated)
    }

  return (
    <>
    <StudentStateContext.Provider value={{  
        user,
        setUser,
        logout,
        login,
        authenticated,
        setAuthenticated
        

    }}>
      {children}
    </StudentStateContext.Provider>
    </>

  )
}

