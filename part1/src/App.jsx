import BlogView from './components/BlogView'
import Users from'./components/Users'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Routes, Route, Link,Navigate
} from 'react-router-dom'
let user = "kik"
const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
        {/* <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link> */}
          {/* {user
      ? <em>{user} logged in</em>
      : <Link style={padding} to="/login">login</Link>
    } */}
      </div>

      <Routes>
        {/* <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<Users />} /> */}
        <Route path="/" element={user?<BlogView />:<Navigate replace to="/login"/>} />
        <Route path="/users" element={<Users />} />
        <Route path = "/login" element={<Login/>}/>
      </Routes>

      <div>
        <i>Blogs app, Department of Computer Science 2024</i>
      </div>
    </Router>
  )
}

export default App


