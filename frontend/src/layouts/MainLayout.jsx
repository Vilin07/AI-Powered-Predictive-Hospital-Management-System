import { Outlet, NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function MainLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

const handleLogout = async () => {
  try {
    await logout();
    navigate("/login");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-5 shadow-lg">

        <h1 className="text-xl font-bold mb-8 ">
           <img style={{ cursor: 'pointer' }} onClick ={()=>{navigate('/')}} className="h-20 w-40 ml-6 rounded-4xl" src="/logo.png" alt="logo" />
        </h1>

        <nav className="space-y-3">

          <NavLink
            to="/dashboard"
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
            to="/patients"
            className={({ isActive }) =>
            `block px-4 py-3 rounded-lg transition-all duration-300 ${
            isActive
            ? "bg-cyan-500 text-white"
            : "hover:bg-slate-800 hover:text-cyan-400"
          }`
         }
      >
     Patients
    </NavLink>

         {user?.role === "Administrator" && (
  <NavLink
    to="/staff"
    className={({ isActive }) =>
      `block px-4 py-3 rounded-lg transition ${
        isActive
          ? "bg-cyan-500 text-white"
          : "hover:bg-slate-800 hover:text-cyan-400"
      }`
    }
  >
    Staff Management
  </NavLink>
)}

          <NavLink
            to="/alerts"
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
            to="/analytics"
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
            to="/live-monitoring"
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
            to="/about"
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

          <NavLink
  to="/profile"
  className={({isActive}) =>
    `block px-4 py-3 rounded-lg transition-all duration-300 ${
      isActive
      ? "bg-cyan-500 text-white"
      : "hover:bg-slate-800 hover:text-cyan-400"
    }`
  }
>
  My Profile
</NavLink>

        </nav>

     {/* AI Status */}
<div className="mt-10 p-4 bg-slate-800 rounded-lg">

  <h3 className="font-semibold text-cyan-400 mb-3">
    AI Status
  </h3>

  <p className="text-green-400 text-sm">
    ● System Online
  </p>

  <p className="text-gray-300 text-sm mt-1">
    Monitoring Patients
  </p>

</div>

{/* Logged In User */}

<div className="mt-6 p-4 bg-slate-800 rounded-lg">

  <h3 className="text-cyan-400 font-semibold mb-4">

    Logged In

  </h3>

  <p className="font-semibold text-white">

    {user?.fullName}

  </p>

  <p className="text-sm text-gray-300">

    {user?.role}

  </p>

  <button
    onClick={handleLogout}
    className="mt-4 w-full bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-lg font-medium"
  >
    Logout
  </button>

</div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>

    </div>
  );
}