import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';


import App from "./App";
import AuthProvider from './context/AuthContext';
import { QueryProvider } from './lib/react-query/QueryProvider';

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <QueryProvider>
            <AuthProvider>
               <App />
            </AuthProvider>
         </QueryProvider>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root'));
