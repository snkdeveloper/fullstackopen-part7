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
import { getBlogs,setToken,create ,getUsers} from "../services/requests";
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

 
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  const handleBlog = async (event) => {
    event.preventDefault();

    setToken(user.token);
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
     
      // setErrorMessage('Cannot Create Blog. Please check your entry and try again.')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  };
  
  const blogForm = () => <h2>Logged in</h2>;

 
  
  blogs.sort((a, b) => (a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0));
  return (
    <div>
      <Notification message={notification}/>
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