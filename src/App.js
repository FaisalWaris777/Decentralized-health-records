import React,{useState,useEffect,useLayoutEffect} from 'react';
import { BrowserRouter,Routes,Route,useHistory,Link} from 'react-router-dom';
import Navbar from "./components/navbar/navbar";
import MainPage from "./components/main-page/main";
import Dashboard from './components/dashboard/dashboard';
import SearchRecordsPage from './components/search-records/search';
import ContactPage from './components/contact/contact';
import AboutUsPage from './components/about-us/about-us';

function App() {
  return (
    < BrowserRouter>
    <Routes>
    <Route path="/" element={<><Navbar/><MainPage/></>} />
    <Route path="/dashboard" element={<><Navbar/><Dashboard/></>} />
    <Route path="/search-records" element={<><Navbar/><SearchRecordsPage/></>} />
    <Route path="/contactus" element={<><Navbar/><ContactPage/></>} />
    <Route path="/aboutus" element={<><Navbar/><AboutUsPage/></>} />
    </Routes>
    </BrowserRouter>
    );
}

export default App;
