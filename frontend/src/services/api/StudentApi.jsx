import { axiosClient } from "../../../src/api/axios";

const StudentApi = {
    create : async (payload) => {
        return await axiosClient.post('admin/students', payload)
        
    },

    delete: async (id) => {
        return await axiosClient.delete(`admin/students/${id}`)
        
    },

  update: async (id, payload) => {
    return await axiosClient.put(`/admin/students/${id}`, {...payload, id})
  },


    all : async() => {
        return await axiosClient.get('admin/students')
    }

}

export default StudentApi