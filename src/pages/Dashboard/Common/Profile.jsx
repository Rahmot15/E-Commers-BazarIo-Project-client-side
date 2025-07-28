import React from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit3,
  Settings,
  Shield,
  Camera,
  BadgeCheck,
  Crown,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleIcon = (roleName) => {
    if (roleName === "admin") return <Crown className="w-5 h-5" />;
    if (roleName === "seller") return <Shield className="w-5 h-5" />;
    if (roleName === "customer") return <User className="w-5 h-5" />;
  };

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* Main Content */}
      <div className="relative z-10 container mx-auto md:px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-5xl bitter-font font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Profile Page
            </h1>
            <p className="text-gray-200 parkinsans-font text-lg">
              Your personal information and role
            </p>
          </div>

          {/* Profile Card */}
          <div className="card bg-white/20 backdrop-blur-lg shadow-2xl border border-white/30 mb-6">
            <div className="card-body p-8">
              {/* Profile Header */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-8">
                {/* Avatar Section */}
                <div className="relative group">
                  <div className="avatar">
                    <div className="w-32 h-32 rounded-full ring ring-white/50 ring-offset-4 ring-offset-transparent group-hover:ring-white/70 transition-all duration-300">
                      <img
                        src={user?.photoURL}
                        alt={user?.displayName}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/80 text-gray-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                    <Camera className="w-4 h-4" />
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                    <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                      {user?.displayName}
                    </h2>
                    <div className="flex gap-2 justify-center lg:justify-start">
                      <div
                        className={`badge badge-lg ${
                          user?.role === "admin"
                            ? "badge-error"
                            : "badge-primary"
                        } gap-2 text-white font-bold tracking-wide`}
                      >
                        {getRoleIcon(role)}
                        {role?.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-100 font-medium">
                      UID: {user?.uid}
                    </p>
                    {user?.emailVerified && (
                      <div className="flex items-center gap-2 mt-2">
                        <BadgeCheck className="w-4 h-4 text-green-400" />
                        <span className="text-green-300 text-sm font-semibold drop-shadow-sm">
                          Email Verified
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                    <div className="stat p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 w-full sm:w-auto">
                      <div className="stat-title text-sm text-gray-100 font-semibold">
                        Account Created
                      </div>
                      <div className="stat-value text-white font-bold drop-shadow-sm">
                        {formatDate(user?.metadata?.creationTime)}
                      </div>
                    </div>
                    <div className="stat p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                      <div className="stat-title text-sm text-gray-100 font-semibold">
                        Last Login
                      </div>
                      <div className="stat-value text-white font-bold drop-shadow-sm">
                        {formatDate(user?.metadata?.lastSignInTime)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-lg">
                    <User className="w-5 h-5 text-white/80" />
                    Personal Info
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
                      <Mail className="w-5 h-5 text-blue-300" />
                      <div>
                        <p className="text-sm text-gray-100 font-semibold">
                          Email
                        </p>
                        <p className="font-semibold text-white drop-shadow-sm">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
                      <Calendar className="w-5 h-5 text-green-300" />
                      <div>
                        <p className="text-sm text-gray-100 font-semibold">
                          Account Created
                        </p>
                        <p className="font-semibold text-white drop-shadow-sm">
                          {formatDate(user?.metadata?.creationTime)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
                      <Calendar className="w-5 h-5 text-purple-300" />
                      <div>
                        <p className="text-sm text-gray-100 font-semibold">
                          Last Login
                        </p>
                        <p className="font-semibold text-white drop-shadow-sm">
                          {formatDate(user?.metadata?.lastSignInTime)}
                        </p>
                      </div>
                    </div>

                    {user?.phoneNumber && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
                        <Phone className="w-5 h-5 text-orange-300" />
                        <div>
                          <p className="text-sm text-gray-100 font-semibold">
                            Phone
                          </p>
                          <p className="font-semibold text-white drop-shadow-sm">
                            {user?.phoneNumber}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-6 border-t border-white/20">
                <button className="btn btn-primary gap-2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm font-semibold">
                  <Edit3 className="w-4 h-4" />
                  Update Profile
                </button>
                <button className="btn btn-outline gap-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-semibold">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button className="btn btn-ghost gap-2 text-white hover:bg-white/20 backdrop-blur-sm font-semibold">
                  <Shield className="w-4 h-4" />
                  Security
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
