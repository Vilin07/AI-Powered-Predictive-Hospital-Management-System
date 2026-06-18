import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import "tailwindcss";

import Navbar from './components/Navbar.jsx';
import HeroSection from './components/Video.jsx';
import DashboardPreview from './components/DashboardPreview.jsx';
import AlertsOverview from './components/AlertsPreview.jsx';
import AboutSection from './components/AboutPreview.jsx';
import Footer from './components/Footer.jsx';
import About from './Pages/About.jsx';
import Dashboard from "./Pages/Dashboard.jsx";
//import Alerts from "./Pages/Alerts.jsx";
import Analytics from "./Pages/Analytics.jsx";


function App() {
  const location = useLocation(); 

  // Hide navbar on About page
 const hideNavbarRoutes = ["/Pages/About", "/Pages/Dashboard", "/Pages/Alerts","/Pages/Analytics"];
 const hideNavbar = hideNavbarRoutes.includes(location.pathname);


  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <DashboardPreview />
              <AlertsOverview />
              <AboutSection />
              <Footer />
            </>
          }
        />

        {/* ABOUT PAGE (Navbar hidden) */}
        <Route path="/Pages/About" element={<About />} />
        <Route path="/Pages/Dashboard" element={<Dashboard />} />
        {/*<Route path="/Pages/Alerts" element={<Alerts />} />*/}
        <Route path="/Pages/Analytics" element={<Analytics />} />
      </Routes>
    </>
  );
}

export default App;
