import { createContext, useState } from "react"
import UserApi from "@/services/api/UserApi"
import { STUDENT_DASHBOARD_ROUTE } from "../router"



export const  UserStateContext = createContext({
    logout: () => {},
    setUser : () => {},
    user : {},
    authenticated : false,
    login : (email , password) => {},
    setAuthenticated : () => {},
    setToken : () => {},

})




export default function UserContext({children}) {

    const [user , setUser] = useState({})
    const [authenticated , _setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'))
   
    const logout = () => {
      setUser({})
      setAuthenticated(false)
    }  

    const  login = async (email,password) => {
      await UserApi.getCSRFToken()
         return UserApi.login(email,password)
    }

    const setAuthenticated = (isAuthenticated) => {
       _setAuthenticated(isAuthenticated)
       window.localStorage.setItem('AUTHENTICATED' , isAuthenticated)
    }


    const setToken = (token) => {
      window.localStorage.setItem('token' , token)
    }
  return (
    <>
    <UserStateContext.Provider value={{  
        user,
        setUser,
        logout,
        login,
        authenticated,
        setAuthenticated,
        setToken

        

    }}>
      {children}
    </UserStateContext.Provider>
    </>

  )
}

