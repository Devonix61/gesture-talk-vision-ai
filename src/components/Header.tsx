import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Header = () => {
  const isAuthenticated = localStorage.getItem('isl-auth') === 'true';
  
  const handleLogout = () => {
    localStorage.removeItem('isl-auth');
    window.location.href = '/';
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ISL Translator
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link to="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link to="#demo-section" className="text-sm font-medium hover:underline underline-offset-4">
            Demo
          </Link>
          <Link to="/privacy" className="text-sm font-medium hover:underline underline-offset-4">
            Privacy
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button>Sign In</Button>
            </Link>
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 pt-4">
              <Link to="/" className="text-base font-medium">
                Home
              </Link>
              <Link to="#features" className="text-base font-medium">
                Features
              </Link>
              <Link to="#demo-section" className="text-base font-medium">
                Demo
              </Link>
              <Link to="#" className="text-base font-medium">
                Pricing
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-base font-medium">
                    Dashboard
                  </Link>
                  <Button variant="ghost" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
