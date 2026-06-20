import { Outlet, NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-5 shadow-lg">

        <h1 className="text-xl font-bold mb-8 ">
           <img style={{ cursor: 'pointer' }} onClick ={()=>{navigate('/')}} className="h-20 w-40 ml-6 rounded-4xl" src="/logo.png" alt="logo" />
        </h1>

        <nav className="space-y-3">

          <NavLink
            to="/Pages/Dashboard"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-slate-800 hover:text-cyan-400"
              }`
            }
          >
             Dashboard
          </NavLink>

          <NavLink
            to="/Pages/Alerts"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-slate-800 hover:text-cyan-400"
              }`
            }
          >
             Alerts
          </NavLink>

          <NavLink
            to="/Pages/Analytics"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-slate-800 hover:text-cyan-400"
              }`
            }
          >
            Analytics
          </NavLink>

          <NavLink
            to="/Pages/LiveMonitoring"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-slate-800 hover:text-cyan-400"
              }`
            }
          >
             Live AI Monitoring
          </NavLink>

          <NavLink
            to="/Pages/About"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-slate-800 hover:text-cyan-400"
              }`
            }
          >
             About
          </NavLink>

        </nav>

        {/* Future AI Status Panel */}
        <div className="mt-10 p-4 bg-slate-800 rounded-lg">
          <h3 className="font-semibold text-cyan-400 mb-2">
            AI Status
          </h3>

          <p className="text-sm text-green-400">
            ● System Online
          </p>

          <p className="text-sm text-gray-300 mt-1">
            Monitoring Patients
          </p>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>

    </div>
  );
}