import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Image } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import GradientWrapper from "../../Components/Shared/Gradient/GradientWrapper";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { saveUserInDb } from "../../api/utils";
const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, signInGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    reset();

    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        const userData = {
          name: data?.name,
          email: data?.email,
          image: data?.photoURL,
        };
        await saveUserInDb(userData);

        navigate("/");
      })
      .catch((error) => {
        toast.error("Register failed: " + error.message);
      });
  };

  const handleGoogle = () => {
    signInGoogle()
      .then(async (result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        const userData = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          image: result?.user?.photoURL,
        };
        await saveUserInDb(userData);

        navigate("/");
      })
      .catch((error) => {
        toast.error("Login failed: " + error.message);
      });
  };

  return (
    <GradientWrapper>
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Join Us
          </h1>
          <p className="text-gray-400">Create your account</p>
        </div>

        {/* Full Name */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none"
          />
          {errors.name && (
            <p className="text-sm text-red-400 mt-1 ml-2">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Photo URL */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Image className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            placeholder="Photo URL"
            {...register("photoURL")}
            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", { required: "Email is required" })}
            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none"
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
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none"
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all"
        >
          Create Account
        </button>

        {/* Link to Login */}
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              Sign In
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
      </form>
    </GradientWrapper>
  );
};

export default RegisterForm;
