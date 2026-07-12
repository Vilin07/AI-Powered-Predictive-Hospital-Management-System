// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import socket from "./socket/socket";
import Login from "./Pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register from "./Pages/Register";

import Navbar from './components/Navbar.jsx';
import HeroSection from './components/Video.jsx';
import DashboardPreview from './components/DashboardPreview.jsx';
import AlertsOverview from './components/AlertsPreview.jsx';
import AboutSection from './components/AboutPreview.jsx';
import Footer from './components/Footer.jsx';
import About from "./Pages/About.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Alerts from "./Pages/Alerts.jsx";
import Analytics from "./Pages/Analytics.jsx";
import LiveMonitoring from "./Pages/LiveMonitoring.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Staff from "./Pages/Staff";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Profile from "./Pages/Profile.jsx";

function App() {
  const location = useLocation();

 const hideNavbarRoutes = [
  "/login",
  "/register",
  "/dashboard",
  "/alerts",
  "/analytics",
  "/live-monitoring",
  "/about",
  "/staff",
  "/profile",
];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to backend");
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from backend");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

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

  {/* LOGIN PAGE */}
  <Route path="/login" element={<Login />} />
  

  {/* Dashboard Layout */}
<Route
  element={
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  }
>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/alerts" element={<Alerts />} />
  <Route path="/analytics" element={<Analytics />} />
  <Route path="/live-monitoring" element={<LiveMonitoring />} />
  <Route path="/about" element={<About />} />
  <Route 
 path="/profile" 
 element={<Profile />} 
/>
  <Route
  path="/staff"
  element={
    <RoleProtectedRoute
      allowedRoles={["Administrator"]}
    >
      <Staff />
    </RoleProtectedRoute>
  }
/>
</Route>

<Route
  path="/register"
  element={
    <RoleProtectedRoute
      allowedRoles={["Administrator"]}
    >
      <Register />
    </RoleProtectedRoute>
  }
/>

</Routes>
    </>
  );
}

export default App;