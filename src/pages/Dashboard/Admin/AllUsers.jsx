import React, { useState } from "react";
import { Users, Edit3, Check, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";

const AllUsers = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-users");
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ email, role }) => {
      const { data } = await axiosSecure.patch(`/user/role/update/${email}`, {
        role,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("User role updated successfully! 🎉");
      setEditingUser(null);
      setNewRole("");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update user role.");
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const roles = [
    { value: "customer", label: "customer", badge: "badge-primary" },
    { value: "seller", label: "seller", badge: "badge-secondary" },
    { value: "admin", label: "Admin", badge: "badge-accent" },
  ];

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "admin":
        return "badge badge-accent";
      case "seller":
        return "badge badge-secondary";
      case "customer":
        return "badge badge-primary";
      default:
        return "badge badge-neutral";
    }
  };

  const startEdit = (user) => {
    setEditingUser(user._id);
    setNewRole(user.role);
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setNewRole("");
  };

  const saveRoleChange = (userEmail) => {
    mutation.mutate({ email: userEmail, role: newRole });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden py-6 px-2">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-full text-primary-content">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                All Users
              </h1>
              <p className="text-base-content/70">
                List of all users and role management
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-primary">{users.length}</div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Vendors</div>
              <div className="stat-value text-secondary">
                {users.filter((u) => u.role === "seller").length}
              </div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Customer</div>
              <div className="stat-value text-primary">
                {users.filter((u) => u.role === "customer").length}
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card rounded-b-2xl overflow-hidden bg-base-100 shadow-xl">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th className="text-left">#</th>
                    <th className="text-left">Name</th>
                    <th className="text-left">Email</th>
                    <th className="text-left">Role</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover">
                      <td className="font-medium">{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                              <img src={user.image} alt={user.name.charAt(0)} />
                            </div>
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="text-base-content/70">{user.email}</td>
                      <td>
                        {editingUser === user._id ? (
                          <select
                            className="select select-bordered select-sm w-full max-w-xs"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                          >
                            {roles.map((role) => (
                              <option key={role.value} value={role.value}>
                                {role.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className={getRoleBadgeClass(user.role)}>
                            {user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)}
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="flex justify-center gap-2">
                          {editingUser === user._id ? (
                            <>
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => saveRoleChange(user.email)}
                                disabled={
                                  !newRole ||
                                  newRole === user.role ||
                                  mutation.isLoading
                                }
                              >
                                <Check size={14} />
                              </button>
                              <button
                                className="btn btn-error btn-sm"
                                onClick={cancelEdit}
                              >
                                <X size={14} />
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn btn-ghost btn-sm text-primary"
                              onClick={() => startEdit(user)}
                              title="Change Role"
                            >
                              <Edit3 size={14} />
                              Change Role
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Role Legend */}
        <div className="mt-6 card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">Role Legend:</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="badge badge-primary">User</span>
                <span className="text-sm text-base-content/70">
                  Regular user with basic permissions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-secondary">Vendor</span>
                <span className="text-sm text-base-content/70">
                  Can sell products and manage inventory
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-accent">Admin</span>
                <span className="text-sm text-base-content/70">
                  Full system access and user management
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AllUsers;
