const User = ({user}) =>{
    console.log(user)
    const blogs = user.blogs
    return(
      <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map(blog=><li key = {blog.id} >{blog.title}</li>) }
      </ul>
      </div>
    )
  
  }

  export default User