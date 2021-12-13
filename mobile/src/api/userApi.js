import axiosClient from "./axiosClient";

const userApi = {
  
    login(data)
    {
        const url = '/api/users/login';
        return axiosClient.post(url, data);
    },
    async getAll(params)
    {
        const url = '/api/users/danhsach';
        return axiosClient.get(url, {params});
    },
    get(id)
    {
        const url = `/api/users/single/${id}`;
        return axiosClient.get(url);
    }
   
    
};
export default userApi;