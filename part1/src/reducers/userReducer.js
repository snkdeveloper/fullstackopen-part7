import { createSlice } from '@reduxjs/toolkit'
const initialState = null

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
      userChange(state,action){
        return action.payload
      }
    }
  }) 
  export const {userChange} = userSlice.actions
export const setUser= (content) =>{
  
  return async dispatch =>{
   
    
    

                                    dispatch(userChange(content))
  }
}
                                  
  

  export default userSlice.reducer