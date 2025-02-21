import {
  BrowserRouter as Router,
  Routes, Route, Link,Navigate,useMatch
} from 'react-router-dom'
import BlogView from './components/BlogView'
import Users from'./components/Users'
import { useState } from 'react'
import Login from './components/Login'
import { useContext} from 'react'
import notContext from './notificationContext'
import { useEffect } from 'react'
import { getBlogs,setToken,create,getUsers } from "./services/requests";
import { useQuery, useMutation } from '@tanstack/react-query'
import Home from './components/Home'
import User from './components/User'


  
const App = () => {
  const match = useMatch('/users/:id')
 
  const result2 = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })
  const [notification,dispatch,user,dispatch3] = useContext(notContext)
  const [isLoading, setIsLoading] = useState(true)
  const padding = {
    padding: 5
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogeappUser");
    
    if (loggedUserJSON) {
     
      const user2 = JSON.parse(loggedUserJSON);

      // setUser(user2);
      dispatch3({type:"change",payload:user2})
     
    
      setToken(user2.token)
    }
    setIsLoading(false)
  }, []);

  if (isLoading) {
    return <div>Loading...</div> // Show loading until user is checked
  }
  
  const logout = () => {
    localStorage.clear();
    dispatch3({type:"change",payload:null});
  };
  
  if ( result2.isLoading ) {
    return <div>loading data...</div>
  }

  const users = result2.data
 
  //
  const user3 = match 
  ? users.find(user => user.id === match.params.id)
  : null
 

  return (
    <div>
      <h2>blogs</h2>
      {/* <Notification message={notification} />
      <Error message={errorMessage} /> */}
      
     
    
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
        <Link style={padding} to="/collection">Collection</Link>

        
        {/* <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link> */}
          {user
      ? <em>{user.name} logged in<button onClick={logout}>log out</button></em>
      : <Link style={padding} to="/login">login</Link>
    }
      </div>
     
      <Routes>
        {/* <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<Users />} /> */}
        <Route path='/' element={<Home/>}/>
        <Route path="/collection" element={user?<BlogView />:<Navigate replace to="/login"/>} />
        <Route path="/users/" element={<Users />} />
        <Route path = "/login" element={<Login/>}/>
        <Route path="/users/:id" element={<User user={user3} />} />
      </Routes>
    
        
  
      <div>
        <i>Blogs app, Department of Computer Science 2024</i>
      </div>
    
    
    </div>
  )
}

export default App


