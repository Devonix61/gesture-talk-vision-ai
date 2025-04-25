
import { Button } from '@/components/ui/button';
import { ArrowLeft, LogOut, BarChart, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isl-auth');
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-isl-primary/10 to-isl-secondary/10 p-6 rounded-xl animate-slide-down [--animation-delay:200ms]">
      <div>
        <div className="flex items-center gap-4 mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToHome}
            className="hover:bg-background/50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors ml-auto md:ml-0"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-isl-primary to-isl-secondary bg-clip-text text-transparent">
          ISL Dashboard
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage your ISL translation settings and view usage statistics.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          variant="outline" 
          className="border-isl-primary/20 hover:bg-isl-primary/10 transition-all group"
        >
          <BarChart className="mr-2 h-4 w-4 text-isl-primary group-hover:scale-110 transition-transform" />
          Analytics
        </Button>
        <Button 
          className="bg-gradient-to-r from-isl-primary to-isl-secondary hover:opacity-90 transition-all group"
        >
          <Camera className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          New Translation
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
