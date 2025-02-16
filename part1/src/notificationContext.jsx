import {createContext, useReducer } from 'react'

const notReducer = (state,action) =>{
  switch(action.type){
    case "message":
      return action.payload
    default:
      return state
  }
 }
 const userReducer = (state,action) =>{
    switch(action.type){
        case "change":
        return action.payload
        default:
      return state

    }
 }

 const notContext = createContext()

 export const NotContextProvider = (props) => {
    const [not, notDispatch] = useReducer(notReducer, null)
    const [user,userDispatch] = useReducer(userReducer,null)
  
    return (
      <notContext.Provider value={[not, notDispatch,user,userDispatch] }>
        {props.children}
      </notContext.Provider>
    )
  }
//   export const burn = () =>{
//     console.log("b2")
//     const [not, notDispatch] = useReducer(notReducer, null)
      
        
//         notDispatch({type:"message",payload:`too short anecdote,must have length 5 or more`})
       
        // setTimeout(() => {
        //   dispatch({type:"message",payload:null})
        // }, 3000)

//   }
export default notContext