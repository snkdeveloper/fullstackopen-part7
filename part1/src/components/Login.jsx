import {
    BrowserRouter as Router,
    Routes, Route, Link,Navigate,useNavigate
  } from 'react-router-dom'
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

  
const Login = () =>{
    const navigate = useNavigate()
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
  const [notification,dispatch,user66,dispatch3] = useContext(notContext)
  
  useEffect(() => {
    if (user66) {
     
    }
  }, [user66]);
  useEffect(() => {
    if (notification) {
     
    }
  }, [notification]);

  
  const blogFormRef = useRef();
  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  // }, []);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
          const user7 = await loginService.login({
            username,
            password,
          });
          window.localStorage.setItem("loggedBlogeappUser", JSON.stringify(user7));
         
          blogService.setToken(user7.token);
          
          dispatch3({type:"change",payload:user7})
          
          setUsername("");
          setPassword("");
          dispatch({type:"message",payload:`Logged in`})
     
          setTimeout(() => {
            dispatch({type:"message",payload:null})
          }, 5000);
          navigate('/collection')
        } catch (exception) {
         
          setErrorMessage("Wrong credentials");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
    
       
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
      return (
        <div>
          <Error message={errorMessage} />
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      );
}

export default Login