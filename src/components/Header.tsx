
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Accessibility, 
  BookOpen, 
  Coffee, 
  HelpCircle, 
  Menu,
  X
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Accessibility className="h-8 w-8 text-isl-primary" />
          <span className="font-bold text-xl text-isl-primary">ISL Translator</span>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-isl-primary transition-colors">
            How It Works
          </a>
          <a href="#" className="text-sm font-medium hover:text-isl-primary transition-colors">
            Features
          </a>
          <a href="#" className="text-sm font-medium hover:text-isl-primary transition-colors">
            Help Center
          </a>
          <Button variant="outline" size="sm" className="gap-1">
            <BookOpen className="h-4 w-4" />
            <span>Learn ISL</span>
          </Button>
          <Button className="bg-isl-primary hover:bg-isl-primary/90 text-white">
            <Coffee className="h-4 w-4 mr-2" />
            <span>Support Us</span>
          </Button>
        </nav>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 pb-4 border-t">
          <nav className="flex flex-col space-y-3">
            <a href="#" className="flex items-center py-2 hover:text-isl-primary transition-colors">
              How It Works
            </a>
            <a href="#" className="flex items-center py-2 hover:text-isl-primary transition-colors">
              Features
            </a>
            <a href="#" className="flex items-center py-2 hover:text-isl-primary transition-colors">
              Help Center
            </a>
            <Button variant="outline" size="sm" className="justify-start gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Learn ISL</span>
            </Button>
            <Button className="bg-isl-primary hover:bg-isl-primary/90 text-white">
              <Coffee className="h-4 w-4 mr-2" />
              <span>Support Us</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
