import { Outlet } from 'react-router';
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar';
;


const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">

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
