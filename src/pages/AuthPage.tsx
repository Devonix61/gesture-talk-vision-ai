
import { useNavigate } from 'react-router-dom';
import { AuthTabs } from '@/components/AuthForms';
import { toast } from '@/components/ui/sonner';

const AuthPage = () => {
  const navigate = useNavigate();
  
  const handleAuthSuccess = () => {
    // Set auth state or token in localStorage in a real app
    localStorage.setItem('isl-auth', 'true');
    
    // Navigate to dashboard
    navigate('/dashboard');
    
    // Show welcome message
    toast.success('Welcome to ISL Translation System!');
  };
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold md:text-4xl">
            ISL Translation System
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sign in to access your personalized ISL translation dashboard and features.
          </p>
        </div>
        
        <AuthTabs onSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
};

export default AuthPage;
