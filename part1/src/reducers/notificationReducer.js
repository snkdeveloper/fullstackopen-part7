import { createSlice } from '@reduxjs/toolkit'
const initialState = null

const notificationSlice = createSlice({
    name:"filter",
    initialState,
    reducers:{
      notificationChange(state,action){
        return action.payload
      }
    }
  }) 
  export const {notificationChange} = notificationSlice.actions
export const setNotification= (content,sec) =>{
  
  return async dispatch =>{
   
    
    
    dispatch(notificationChange(`${content}`))
                                  setTimeout(() => {
                                    dispatch(notificationChange(null))
                                  }, sec*1000)}}
  

  export default notificationSlice.reducer