
import { Accessibility, Github, Heart, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <Accessibility className="h-6 w-6 text-isl-primary" />
            <span className="font-bold text-lg text-isl-primary">ISL Translator</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Breaking communication barriers with advanced AI-powered sign language translation.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium text-sm mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Learn ISL</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Reference</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-sm mb-3">Community</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Forums</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Events</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Discord</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contribute</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-sm mb-3">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-4 w-4" />
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} ISL Translator. All rights reserved.
        </p>
        <p className="text-xs flex items-center gap-1 text-muted-foreground">
          Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for accessibility
        </p>
      </div>
    </footer>
  );
};

export default Footer;
