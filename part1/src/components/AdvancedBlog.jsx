import { useState } from "react";
import blogService from "D:\\Projects\\fullstack\\fullstackopen-part5\\part1\\src\\services\\blogs.js";
import { Link } from "react-router-dom";
const AdvancedBlog = ({blog}) =>{

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
      const [like, setLike] = useState(false);
      const [test, setTest] = useState(false);

   
    return(
        <div>
        <h1> Hi {blog.title}</h1>
        <p>
        <Link to={blog.url}>{blog.url}</Link> 
        </p>
        <p>
          likes <span name="like">{blog.likes}</span>{" "}
         <button onClick={onLike}>like</button>
        </p>
        <p>
          added by {blog.author}
        </p>
        </div>
    )
}

export default AdvancedBlog