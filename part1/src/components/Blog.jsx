import { useState } from "react";
import blogService from "D:\\Projects\\fullstack\\fullstackopen-part5\\part1\\src\\services\\blogs.js";
import { Link } from "react-router-dom";
const Blog = ({ blog, user }) => {
  const [view, setView] = useState(false);
  const [like, setLike] = useState(false);
  const [test, setTest] = useState(false);
  const padding = {
    padding: 5,
    textDecoration:'none'
    
  }
  const onChange = () => {
    setView(!view);
  };
  const onRemove = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.delete2(blog.id, user.token);
      setTest(!test);
    }
  };
  const onLike = () => {
    const nblog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    blog.likes = blog.likes + 1;
    blogService.update(blog.id, nblog);
    setLike(!like);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (test) {
    return null;
  }
  if (view && user.name === blog.user.name) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={onChange}>hide</button>
        <p>{blog.url}</p>
        <p>
          likes <span name="like">{blog.likes}</span>{" "}
          <button onClick={onLike}>like</button>
        </p>
        <p>{blog.author}</p>
        <button onClick={onRemove}>remove</button>
      </div>
    );
  }

  if (view) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={onChange}>hide</button>
        <p>{blog.url}</p>
        <p>
          likes <span name="like">{blog.likes}</span>{" "}
          <button onClick={onLike}>like</button>
        </p>
        <p>{blog.author}</p>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      <Link to={`/collection/${blog.id}`} style ={padding}>
      {blog.title}
      </Link>
      {/* <button onClick={onChange} name="view">
        view
      </button> */}
    </div>
  );
};

export default Blog;
