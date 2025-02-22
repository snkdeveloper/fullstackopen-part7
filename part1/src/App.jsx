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
import AdvancedBlog from './components/AdvancedBlog'
import { Footer } from './styles/styles'
import { Navigation } from './styles/styles'
import { Header } from './styles/styles'
import { Button } from './styles/styles'
import { Username } from './styles/styles'
  
const App = () => {
  const match = useMatch('/users/:id')
  const match2 = useMatch('/collection/:id')
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })
 
  const result2 = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })
  const [notification,dispatch,user,dispatch3] = useContext(notContext)
  const [isLoading, setIsLoading] = useState(true)
  const padding = {
    padding: 5,
    textDecoration:'none'
    
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
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  
  if ( result2.isLoading ) {
    return <div>loading data...</div>
  }
  const blogs = result.data
  const users = result2.data
  const blog3 = match2 
  ? blogs.find(blog => blog.id === match2.params.id)
  : null
 
  //
  const user3 = match 
  ? users.find(user => user.id === match.params.id)
  : null
 

  return (
    <div>
      <Header>
      <h2>MERN COLLECTION OF BLOGS</h2>
      </Header>
      {/* <Notification message={notification} />
      <Error message={errorMessage} /> */}
      
     
    
      <Navigation>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/users">Users</Link>
        <Link style={padding} to="/collection">Collection</Link>

        
        {/* <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link> */}
          {user
      ? <em><Username>{user.name} logged in</Username><Button onClick={logout}>log out</Button></em>
      : <Link style={padding} to="/login">Login</Link>
    }
      </Navigation>
     
      <Routes>
        {/* <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<Users />} /> */}
        <Route path='/' element={<Home/>}/>
        <Route path="/collection" element={user?<BlogView />:<Navigate replace to="/login"/>} />
        <Route path="/users/" element={<Users />} />
        <Route path = "/login" element={<Login/>}/>
        <Route path="/users/:id" element={<User user={user3} />} />
        <Route path="/collection/:id" element={<AdvancedBlog blog={blog3} />} />
      </Routes>
    
        
  
      <div>
        <Footer>Blogs app, Department of Computer Science 2024</Footer>
      </div>
    
    
    </div>
  )
}

export default App


