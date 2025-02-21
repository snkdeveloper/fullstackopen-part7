import { Routes,Route,Link ,useMatch} from "react-router-dom";
import { getBlogs,setToken,create ,getUsers} from "../services/requests";
import { useQuery, useMutation } from '@tanstack/react-query'

const Users =()=>{
 

    const result2 = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
      })
      if ( result2.isLoading ) {
        return <div>loading data...</div>
      }

    const users = result2.data
    
  
    
    

    
    return (
    <div>
      
    <h2>Users</h2>
    
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">blogs created</th>
        </tr>
      </thead>
      <tbody>
      {users.map(user =><tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
      </tbody>
    </table>
   
        
       
    
  </div>
  
)
}

export default Users
