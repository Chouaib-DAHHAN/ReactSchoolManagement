import { axiosClient } from "../../../src/api/axios";



const UserApi = {
   
    login : async (email,password) => {
        return await axiosClient.post('/login', {email,password})
        
    },
    getUser : async () => {
        return await  axiosClient.get("/admin")
    },

    logout : async () => {
        return await axiosClient.post('/logout')
    }




  
}

export default UserApi