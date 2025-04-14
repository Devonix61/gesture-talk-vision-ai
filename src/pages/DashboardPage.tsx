
import Dashboard from '@/components/Dashboard';
import { useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

const DashboardPage = () => {
  useEffect(() => {
    // Welcome toast on dashboard load
    toast.success('Welcome to ISL Dashboard', {
      description: 'Your translation tools are ready to use!',
      duration: 5000,
    });
  }, []);

  return (
    <div className="min-h-screen py-6 backdrop-blur-sm">
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
