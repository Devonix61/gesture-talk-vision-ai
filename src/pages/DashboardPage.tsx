
import Dashboard from '@/components/Dashboard';
import { useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

const DashboardPage = () => {
  useEffect(() => {
    toast.success('Welcome to ISL Dashboard', {
      description: 'Your translation tools are ready to use!',
      duration: 5000,
    });
  }, []);

  return (
    <div className="min-h-screen py-6 backdrop-blur-sm animate-fade-in">
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
