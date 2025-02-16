import loginService from "../services/login";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import notContext from "../notificationContext";
import axios from "axios";
import blogService from "../services/blogs";
import { useQuery, useMutation } from '@tanstack/react-query'
import Error from "../components/Error";
import BlogForm from "../components/BlogForm";
import Blog from "../components/Blog";
import Notification from "../components/Notification";
import Togglable from "../components/Togglable";
import { getBlogs,setToken,create } from "../services/requests";
import { useQueryClient } from "@tanstack/react-query";
const BlogView = () => {
  // const [blogs, setBlogs] = useState([]);
  const queryClient = useQueryClient()
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })
  const config = {
    headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMiIsImlkIjoiNjc4Mjg4ZjdlYTY3ZTg1YzI3ODRiYmYwIiwiaWF0IjoxNzM5NjE2NzgyfQ.8Zi59z_qdWjwX2pTOxPkoEXrcVtOwSoY00XBEi5bpvg" },
  }
  const newBlogMutation = useMutation({
    mutationFn:create, 
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  
  const blogs = result.data
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);

  // const [notification, setNotification] = useState(null);
  const [notification,dispatch,user,dispatch3] = useContext(notContext)
  const blogFormRef = useRef();
  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  // }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogeappUser");
    
    if (loggedUserJSON) {
      console.log("wtf",loggedUserJSON);
      const user2 = JSON.parse(loggedUserJSON);

      // setUser(user2);
      dispatch3({type:"change",payload:user2})
      console.log("user2",user);
    
      setToken(user2.token)
    }
  }, []);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  const handleBlog = async (event) => {
    event.preventDefault();

    blogService.setToken(user.token);
    try {
      if (title === "" || author === "" || url === "") {
        throw new Error("Boo");
      }
      const newObj = {
        title: title,
        author: author,
        url: url,
        likes: 0,
      };

      blogFormRef.current.toggleVisibility();
      // await blogService.create(newObj);
      await newBlogMutation.mutate(newObj)
     
      // blogService.getAll().then((blogs) => setBlogs(blogs));

      dispatch({type:"message",payload:`Created a new blog`})
      getBlogs()
      setTimeout(() => {
        dispatch({type:"message",payload:null});
      }, 5000);
    } catch (exception) {
      console.log(exception);
      // setErrorMessage('Cannot Create Blog. Please check your entry and try again.')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user7 = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogeappUser", JSON.stringify(user7));
      console.log(user7.token);
      blogService.setToken(user7.token);

      dispatch3({type:"change",payload:user7})
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception)
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    dispatch({type:"message",payload:`Logged in`})
    setTimeout(() => {
      dispatch({type:"message",payload:null})
    }, 5000);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
  const blogForm = () => <h2>Logged in</h2>;

  if (user === null) {
    return (
      <div>
        <Error message={errorMessage} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    );
  }
  const logout = () => {
    localStorage.clear();
    dispatch3({type:"change",payload:null});
  };
  blogs.sort((a, b) => (a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0));
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <Error message={errorMessage} />
      <h4>
        {user.name} logged in<button onClick={logout}> logout</button>
      </h4>
      <Togglable buttonLabel="a new blog" ref={blogFormRef}>
        <BlogForm
          handleBlog={handleBlog}
          author={author}
          setAuthor={setAuthor}
          title={title}
          setTitle={setTitle}
          url={url}
          setUrl={setUrl}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};
export default BlogView;