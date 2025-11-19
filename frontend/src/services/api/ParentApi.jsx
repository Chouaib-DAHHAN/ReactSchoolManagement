import { axiosClient } from "../../../src/api/axios";



const ParentApi = {
    create : async (payload) => {
        return await axiosClient.post('admin/parents', payload)
        
    },

    all : async() => {
        return await axiosClient.get('admin/parents')
    }

}

export default ParentApi