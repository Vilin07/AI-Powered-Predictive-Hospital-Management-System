import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
 const navigate = useNavigate();

const { login } = useAuth();

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

const [form, setForm] = useState({
  email: "",
  password: "",
});
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    setError("");

    await login(form);

    navigate("/dashboard");

  } catch (err) {

    setError(err.message);

  } finally {

    setLoading(false);

  }

};

  return (
    <div className="min-h-screen flex bg-slate-50 border-8 border-amber-50">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-indigo-700 to-fuchsia-600 to-slate-900 text-white p-16 flex-col justify-between">

        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            AI Powered
            <br />
            Predictive Hospital
            <br />
            Management System
          </h1>

          <p className="mt-8 text-lg text-blue-100 leading-8">
            Secure clinical platform designed for doctors,
            nurses and hospital administrators to monitor
            patients in real time using AI-powered distress
            detection and predictive analytics.
          </p>
        </div>

        <div className="space-y-5">

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <p>Real-time Patient Monitoring</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <p>Predictive AI Risk Detection</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <p>Role-Based Secure Access</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <p>Live Clinical Decision Support</p>
          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

     <div
      className="flex-1 flex justify-center items-center px-8 bg-cover bg-center bg-no-repeat"
      style={{
      backgroundImage: "url('/hospital-bg.jpg')",
      }}
      >

        <div className="bg-white/10 backdrop-blur-lg w-full max-w-md rounded-3xl shadow-xl border border-white/20 p-10">

          <div className="text-center ">

            <div className="w-30 h-17 rounded-4xl bg-blue-100 mx-auto flex items-center justify-center text-6xl border-2 ">
              <img className="rounded-full" src="/logo.png" alt="logo" />
            </div>

            <h2 className="text-3xl font-bold mt-6">
              Hospital Staff Login
            </h2>

            <p className="text-gray-500 mt-3">
              Sign in to access the AI Monitoring Dashboard
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            <div>

              <label className="block mb-2 font-medium">
                Hospital Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="doctor@hospital.com"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2">

                <input type="checkbox" />

                Remember this device

              </label>

              <button
                type="button"
                className="text-blue-600 hover:underline"
              >
                Need Help?
              </button>

            </div>

            {error && (

<div className="bg-red-100 text-red-600 p-3 rounded-xl text-sm">

{error}

</div>

)}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >

            {loading ? "Signing In..." : "Sign In"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}