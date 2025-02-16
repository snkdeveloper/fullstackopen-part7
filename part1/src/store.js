import { configureStore } from '@reduxjs/toolkit'
import blogreducer from './reducers/blogReducer'
import notification from '../src/reducers/notificationReducer'
import userreducer from '../src/reducers/userReducer'
const store = configureStore({
    reducer:{
        blogs:blogreducer,
        notification:notification,
        user:userreducer


    }
})

export default store