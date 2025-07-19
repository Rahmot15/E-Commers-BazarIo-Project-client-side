import React, { useState } from 'react';
import { Users, Edit3, Check, X } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllUsers = () => {
  // Static user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'রহিম উদ্দিন',
      email: 'rahim@example.com',
      role: 'user'
    },
    {
      id: 2,
      name: 'ফাতিমা খাতুন',
      email: 'fatima@example.com',
      role: 'vendor'
    },
    {
      id: 3,
      name: 'করিম আহমেদ',
      email: 'karim@example.com',
      role: 'admin'
    },
    {
      id: 4,
      name: 'সালমা বেগম',
      email: 'salma@example.com',
      role: 'user'
    },
    {
      id: 5,
      name: 'নাসির হোসেন',
      email: 'nasir@example.com',
      role: 'vendor'
    },
    {
      id: 6,
      name: 'রুমানা আক্তার',
      email: 'rumana@example.com',
      role: 'user'
    },
    {
      id: 7,
      name: 'তানভীর রহমান',
      email: 'tanvir@example.com',
      role: 'admin'
    },
    {
      id: 8,
      name: 'শাহিনা পারভীন',
      email: 'shahina@example.com',
      role: 'user'
    }
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  const roles = [
    { value: 'user', label: 'User', badge: 'badge-primary' },
    { value: 'vendor', label: 'Vendor', badge: 'badge-secondary' },
    { value: 'admin', label: 'Admin', badge: 'badge-accent' }
  ];

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'admin':
        return 'badge badge-accent';
      case 'vendor':
        return 'badge badge-secondary';
      case 'user':
        return 'badge badge-primary';
      default:
        return 'badge badge-neutral';
    }
  };

  const startEdit = (user) => {
    setEditingUser(user.id);
    setNewRole(user.role);
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setNewRole('');
  };

  const saveRoleChange = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );

    const user = users.find(u => u.id === userId);
    toast.success(`${user.name} এর Role সফলভাবে ${newRole} এ পরিবর্তন হয়েছে! 🎉`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setEditingUser(null);
    setNewRole('');
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden py-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-full text-primary-content">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">All Users</h1>
              <p className="text-base-content/70">List of all users and role management</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-primary">{users.length}</div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Admins</div>
              <div className="stat-value text-accent">{users.filter(u => u.role === 'admin').length}</div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Vendors</div>
              <div className="stat-value text-secondary">{users.filter(u => u.role === 'vendor').length}</div>
            </div>
            <div className="stat bg-base-100 rounded-lg shadow">
              <div className="stat-title">Regular Users</div>
              <div className="stat-value text-primary">{users.filter(u => u.role === 'user').length}</div>
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
                    <tr key={user.id} className="hover">
                      <td className="font-medium">{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                              <span className="text-sm">{user.name.charAt(0)}</span>
                            </div>
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="text-base-content/70">{user.email}</td>
                      <td>
                        {editingUser === user.id ? (
                          <select
                            className="select select-bordered select-sm w-full max-w-xs"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                          >
                            {roles.map(role => (
                              <option key={role.value} value={role.value}>
                                {role.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className={getRoleBadgeClass(user.role)}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="flex justify-center gap-2">
                          {editingUser === user.id ? (
                            <>
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => saveRoleChange(user.id)}
                                disabled={!newRole || newRole === user.role}
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
                <span className="text-sm text-base-content/70">Regular user with basic permissions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-secondary">Vendor</span>
                <span className="text-sm text-base-content/70">Can sell products and manage inventory</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-accent">Admin</span>
                <span className="text-sm text-base-content/70">Full system access and user management</span>
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
        theme="colored"
      />
    </div>
  );
};

export default AllUsers;
