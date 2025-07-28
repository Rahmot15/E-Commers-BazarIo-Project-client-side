import { Outlet } from 'react-router';
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar';
;


const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <div className="p-2 md:p-6">
          {/* Page Content Render Here */}
          <div className="md:mt-0 mt-16">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
