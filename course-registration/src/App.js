import React from 'react';
import logo from './Assets/logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/home";
import Header from  "./Components/Header/header";
import Login from "./Pages/Login/login";
import Register from "./Pages/Register/register";
import InstructorDashboard from "./Pages/InstructorDashboard/instructorDashboard";
import CreateCourseSection from "./Pages/CreateCourseSection/createCourseSection";
import LandingPage from './Pages/Navigation/navigation';




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
          <Route path = "/home" element={<LandingPage />} />
          <Route path = "/login" element={<Login />} />
          <Route path = "/register" element={<Register />} />
          <Route path = "/dashboard/instructor" element={<InstructorDashboard />} />
          <Route path = "/dashboard/create" element={<CreateCourseSection />} />
        

        {/* 404 if we try to access an invalid path */}
        <Route path="*" element=
          {<div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
           }}> 
           <h1>404 - Page Not Found</h1>
          </div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
