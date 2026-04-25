import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Login = () => {
  const { loginUser, googleSignIn, resetPassword } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const emailValue = form.email.value;
    const password = form.password.value;

    loginUser(emailValue, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error("Invalid email or password!");
        console.error(error);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Google Sign-In successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error("Google Sign-In failed!");
        console.error(error);
      });
  };

  const handleResetPassword = () => {
    if (!email) {
      toast.error("Please enter your email to reset password.");
      return;
    }
    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox.");
        // Redirect to gmail (just as an assignment challenge simulation)
        window.open("https://mail.google.com", "_blank");
      })
      .catch((error) => {
        toast.error("Failed to send reset email.");
        console.error(error);
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">Login to GreenNest</h2>
          <form onSubmit={handleLogin}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className="input input-bordered focus:outline-primary"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  className="input input-bordered focus:outline-primary w-full pr-10"
                  required
                />
                <span
                  className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </span>
              </div>
            </div>
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="form-control mt-4">
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </form>
          
          <div className="divider">OR</div>
          
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-primary w-full gap-2"
          >
            <FaGoogle /> Continue with Google
          </button>
          
          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
