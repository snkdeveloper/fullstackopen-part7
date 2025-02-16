import{createSlice, current} from '@reduxjs/toolkit'
import blogService from "../services/blogs"
const initialState = []

const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{
        appendBlog(state,action){
            state.push(action.payload)
        },
        setBlog(state,action){
            return action.payload
        },
        like(state,action){
            const id = action.payload
            const blogToChange = state.find(n=>n.id===id)
            const changedBlog = {
                ...blogToChange,
                likes:blogToChange.likes + 1

            }
            return state.map(blog =>blog.id!==id?blog:changedBlog)



        }


    }
})

export const {appendBlog,setBlog,like} = blogSlice.actions

export const initializeBlog = () =>{
    return async dispatch =>{
        const blogs = await blogService.getAll()
        blogs.sort((a, b) => (a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0))
        dispatch(setBlog(blogs))
    }
}

export const createBlog = content =>{
    return async dispatch =>{
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export const liking = id =>{
    return async dispatch =>{
        const id2 = await blogService.liked(id)
        dispatch(like(id2))
    }
}

export default blogSlice.reducer



