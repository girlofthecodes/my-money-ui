import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'

import { App } from './App'

import './index.css'
import './App.css'


const  root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </StrictMode>
);