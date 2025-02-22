import { useState } from "react";
import blogService from "D:\\Projects\\fullstack\\fullstackopen-part5\\part1\\src\\services\\blogs.js";
import { Link } from "react-router-dom";
import { useMatch } from "react-router-dom";
import axios from 'axios'
import { Button } from "../styles/styles";
import { Input } from "../styles/styles";
import { Page } from "../styles/styles";
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
        <Page>
        <h1> Hi {blog.title}</h1>
        <p>
        <Link to={blog.url}>{blog.url}</Link> 
        </p>
        <p>
          likes <span name="like">{blog.likes}</span>{" "}
         <Button onClick={onLike}>like</Button>
        </p>
        <p>
          added by {blog.author}
        </p>
        <h4>
          comments
          </h4>
          <form onSubmit={onComment}>
            <div>
            <Input
            data-testid="comment"
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
            <Button type="submit">add comment</Button>
            </div>

          </form>
          <ul>
            {comments.map((comment,index)=><li key={index}>{comment}</li>)}
          </ul>
       
        </Page>
    )
}

export default AdvancedBlog