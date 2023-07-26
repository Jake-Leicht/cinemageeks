import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import UserDashboard from './pages/UserDashboard';
import NoPageFound from './pages/NoPageFound';
import "./styles/app.scss";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<HomePage/>}/>
          <Route path="UserDashboard" element={<UserDashboard/>}/>
          <Route path="NoPageFound" element={<NoPageFound/>}/>
          <Route path="*" element={<NoPageFound/>}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);