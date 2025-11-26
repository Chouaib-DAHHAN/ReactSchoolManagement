import { axiosClient } from "../../../src/api/axios";

const ParentApi = {
    create : async (payload) => {
        return await axiosClient.post('admin/parents', payload)
        
    },

    delete: async (id) => {
        return await axiosClient.delete(`admin/parents/${id}`)
        
    },

   update : async (id,payload) => {
    delete payload.id
        return await axiosClient.put(`admin/parents/${id}`)
        
    },


    all : async() => {
        return await axiosClient.get('admin/parents')
    }

}

export default ParentApi