import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Recentlyadded from '../components/home/Recentlyadded'
import Homemain from '../components/home/Mainpage';
import Navbar from '../components/navbar/navbar';
 import Footer from '../components/footer';

function Home() {
  return (
    <>

   <Homemain/>
     <Recentlyadded/>

   
    </>
  );
}

export default Home;
