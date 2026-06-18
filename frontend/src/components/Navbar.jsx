import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "HOME", path: "/" },
    { name: "DASHBOARD", path: "/Pages/Dashboard" },
    { name: "ALERTS", path: "/Pages/Alerts" },
    { name: "ANALYTICS", path: "/Pages/Analytics" },
    { name: "ABOUT", path: "/Pages/About" },
  ];

  return (
    <div className="w-full fixed top-0 left-0 bg-gradient-to-r from-[#0a0f2c]/95 via-[#120a2a]/95 to-[#1a043a]/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-[1000] border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-5">

        {/* Logo + Project Name */}
        <div className="flex items-center gap-4">
          <div className="w-30 h-15 rounded-4xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.7)]">
            <img className="h-full w-full rounded-4xl" src="/logo.png" alt="logo" />
          </div>
          <span className="text-white font-extrabold text-xl tracking-wide">
            Predictive Hospital Management AI
          </span>
        </div>

        {/* Navigation Items */}
        <ul className="flex gap-12">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative font-semibold text-xs tracking-[2px] transition-all duration-300
                  ${isActive ? "text-fuchsia-400" : "text-slate-300 hover:text-fuchsia-400"}
                  after:content-[''] after:absolute after:-bottom-[6px] after:left-1/2 after:-translate-x-1/2
                  after:w-full after:h-[2px] after:bg-gradient-to-r after:from-indigo-500 after:to-fuchsia-500
                  after:transition-transform after:duration-300
                  ${isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Navbar;
