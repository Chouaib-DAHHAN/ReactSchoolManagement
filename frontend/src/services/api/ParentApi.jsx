import { axiosClient } from "../../../src/api/axios";



const ParentApi = {
    create : async (payload) => {
        return await axiosClient.post('admin/parents', payload)
        
    }

}

export default ParentApi