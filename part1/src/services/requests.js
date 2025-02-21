
import axios from 'axios'
 const baseUrl = '/api/blogs'
 const baseUrl2 = '/api/users'
let token = null
 export const getBlogs = ()=>
    axios.get(baseUrl).then(res=>res.data)
 export const getUsers = ()=>{
 
  return axios.get(baseUrl2).then(res=>res.data)}

 export const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
  };
  export const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    };
    
   
    const response = await axios.post(baseUrl, newObject, config);
  
    return response.data;
  };

