import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from 'react-router-dom'
  
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<Router><App /></Router>)