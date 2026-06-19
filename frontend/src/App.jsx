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
import Alerts from "./Pages/Alerts.jsx";
import Analytics from "./Pages/Analytics.jsx";
import MainLayout from './layouts/MainLayout.jsx';
import LiveMonitoring from './Pages/LiveMonitoring.jsx';


function App() {
  const location = useLocation(); 

const hideNavbarRoutes = [
  "/Pages/About",
  "/Pages/Dashboard",
  "/Pages/Alerts",
  "/Pages/Analytics",
  "/Pages/LiveMonitoring"
];
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

  {/* About page */}
  <Route path="/Pages/about" element={<About />} />

  {/* Dashboard Layout Routes */}
<Route element={<MainLayout />}>
  <Route path="/Pages/Dashboard" element={<Dashboard />} />
  <Route path="/Pages/Alerts" element={<Alerts />} />
  <Route path="/Pages/Analytics" element={<Analytics />} />
  <Route path="/Pages/LiveMonitoring" element={<LiveMonitoring />} />
</Route>
</Routes>
    </>
  );
}

export default App;
