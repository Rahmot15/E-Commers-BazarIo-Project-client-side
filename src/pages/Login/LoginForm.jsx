import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import GradientWrapper from "../../Components/Shared/Gradient/GradientWrapper";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { saveUserInDb } from "../../api/utils";
import { Helmet } from "react-helmet";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then(async (result) => {
        console.log(result);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        const userData = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          image: result?.user?.photoURL,
        };
        await saveUserInDb(userData);

        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login failed: " + error.message);
      });
  };

  const handleGoogle = () => {
    signInGoogle()
      .then(async (result) => {
        console.log(result);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        const userData = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          image: result?.user?.photoURL,
        };
        await saveUserInDb(userData);

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login failed: " + error.message);
      });
  };

  return (
    <GradientWrapper>
      <Helmet>
        <title>BazarIo | Login </title>
      </Helmet>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-400">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
          {errors.email && (
            <p className="text-sm text-red-400 mt-1 ml-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
          {errors.password && (
            <p className="text-sm text-red-400 mt-1 ml-2">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all"
        >
          Sign In
        </button>
      </form>

      {/* Link to Register */}
      <div className="mt-8 text-center">
        <p className="text-gray-400">
          Don't have an account?
          <Link
            to="/register"
            className="ml-1 text-purple-400 hover:text-purple-300 font-semibold transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Social login */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full mt-4 flex gap-2 justify-center py-2 px-4 border border-gray-600 rounded-lg bg-gray-700/50 text-sm font-medium text-gray-300 hover:bg-gray-600/50 transition-colors"
        >
          <FcGoogle size={20} /> Google
        </button>
      </div>
    </GradientWrapper>
  );
};

export default LoginForm;
