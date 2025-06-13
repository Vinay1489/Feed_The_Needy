
import { Link, useNavigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/FakeAuthContext";

function DonorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/donorlogin/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-6 py-12">
        <div className="w-full max-w-lg p-10 bg-white rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-3">
            🔐 Donor Login
          </h2>
          <p className="text-center text-base text-gray-600 mb-8">
            Welcome back! Login to manage your food donations <br />
            and make a difference.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">
                📧 Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">
                🔑 Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                Remember me
              </label>
              <Link to="/donorforgot" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-200"
            >
              🚀 Sign In
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{" "}
              <Link
                to="/donorsignup"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default DonorLogin;
