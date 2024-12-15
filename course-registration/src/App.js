import React from 'react';
import logo from './Assets/logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/home";
import Header from  "./Components/Header/header";
import Login from "./Pages/Login/login";
import Register from "./Pages/Register/register";
import InstructorDashboard from "./Pages/InstructorDashboard/instructorDashboard";



// Take a look at how the components work here... 
// Our routes (above) reference the .js files we worked on, so {<Home/>} is really ==> import Home from "./Pages/Home/home"; 
// React creates a tree with nodes when compiling. This app.js should be the trunk of our tree.
// Follow the paths down (or up whatever makes sense to u) of the tree... once you can picture the structure of the app, you can start adding your components. 

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route  path= "/" element={<Home />} />
          <Route path = "/login" element={<Login />} />
          <Route path = "/register" element={<Register />} />
          <Route path = "/dashboard/instructor" element={<InstructorDashboard />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
