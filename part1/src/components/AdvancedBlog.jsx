import { useState } from "react";
import blogService from "D:\\Projects\\fullstack\\fullstackopen-part5\\part1\\src\\services\\blogs.js";
import { Link } from "react-router-dom";
import { useMatch } from "react-router-dom";
import axios from 'axios'

const AdvancedBlog = ({blog}) =>{
 
    let comments = blog.comments
   
    
    
    const [comment,setComment] = useState("")
    const [like, setLike] = useState(false);
    const [test, setTest] = useState(false);
    ;
    const [id2,setId2] = useState(0)
    const match2 = useMatch('/collection/:id')
    const id = match2.params.id
    
    
    const onComment = async(event) =>{
      event.preventDefault();
      const ncomment = {
        "comment":comment
      }
      axios.post(`/api/blogs/${id}/comments`,ncomment)
      comments = comments.push(comment)
      setTest(!test)

      

       
    }
     const onLike = () => {
         const nblog = {
           user: blog.user,
           likes: blog.likes + 1,
           author: blog.author,
           title: blog.title,
           url: blog.url,
           comments:blog.comments
         };
         blog.likes = blog.likes + 1;
         blogService.update(blog.id, nblog);
         setLike(!like);
       };
   

   
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
        <h4>
          comments
          </h4>
          <form onSubmit={onComment}>
            <div>
            <input
            data-testid="comment"
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
            <button type="submit">add comment</button>
            </div>

          </form>
          <ul>
            {comments.map((comment,index)=><li key={index}>{comment}</li>)}
          </ul>
       
        </div>
    )
}

export default AdvancedBlog