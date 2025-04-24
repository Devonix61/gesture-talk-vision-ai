
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera } from 'lucide-react';

const HeroSection = () => {
  const handleStartDemo = () => {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-secondary/10 rounded-full filter blur-3xl animate-pulse-slow delay-700" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-6 z-10">
            <div className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 rounded-full pl-2 pr-5 py-1 w-fit animate-fade-in">
              <span className="bg-primary/20 rounded-full p-1">
                <Camera className="h-4 w-4 text-primary" />
              </span>
              <span className="text-sm font-medium text-primary/80">AI-Powered Recognition</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                ISL Translation with{" "}
                <span className="bg-gradient-to-r from-isl-primary to-isl-secondary bg-clip-text text-transparent relative">
                  AI Voice
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-isl-primary to-isl-secondary opacity-50 rounded-full"></span>
                </span>
              </h1>
              
              <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                Breaking communication barriers with AI-powered sign language translation. Convert ISL gestures to text and natural speech in real-time.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button 
                onClick={handleStartDemo}
                className="bg-gradient-to-r from-isl-primary to-isl-secondary text-white hover:opacity-90 transition-all duration-300 shadow-lg"
                size="lg"
              >
                <Camera className="mr-2 h-5 w-5" />
                Try Live Demo
              </Button>
              
              <Button variant="outline" size="lg" className="border-primary/20 bg-white/5 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 mt-8 bg-white/5 backdrop-blur-sm border border-primary/10 rounded-xl p-4 animate-fade-in">
              <div className="flex -space-x-3">
                <img
                  alt="User"
                  className="rounded-full border-2 border-background shadow-lg w-10 h-10"
                  src="https://i.pravatar.cc/100?img=1"
                />
                <img
                  alt="User"
                  className="rounded-full border-2 border-background shadow-lg w-10 h-10"
                  src="https://i.pravatar.cc/100?img=2"
                />
                <img
                  alt="User"
                  className="rounded-full border-2 border-background shadow-lg w-10 h-10"
                  src="https://i.pravatar.cc/100?img=3"
                />
              </div>
              <div>
                <div className="text-sm font-medium">Trusted by 10,000+ users worldwide</div>
                <div className="text-xs text-muted-foreground">Join our growing community today</div>
              </div>
            </div>
          </div>
          
          <div className="relative group z-10">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-isl-primary via-isl-secondary to-isl-accent opacity-75 blur-md animate-pulse-slow"></div>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-muted shadow-2xl">
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white relative">
                <div className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="flex flex-col items-center">
                      <HandGestureIllustration />
                      <div className="mt-6 text-xl font-medium">ISL Gesture Recognition</div>
                      <div className="text-sm text-slate-300 mt-2 max-w-xs">
                        Our advanced AI technology recognizes and interprets sign language with high accuracy
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 text-xs bg-gradient-to-r from-isl-primary to-isl-secondary px-3 py-1 rounded-full font-medium">
                    AI-Powered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced hand gesture SVG illustration with animation
const HandGestureIllustration = () => (
  <svg 
    width="180" 
    height="180" 
    viewBox="0 0 180 180" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="animate-float"
  >
    {/* Glow effect */}
    <circle cx="90" cy="90" r="55" fill="url(#radialGlow)" />
    
    {/* Main circle */}
    <circle cx="90" cy="90" r="45" stroke="url(#circleGradient)" strokeWidth="2.5" strokeDasharray="4 2" className="animate-spin-slow" />
    <circle cx="90" cy="90" r="8" fill="url(#centerGradient)" />
    
    {/* Fingers with gradients */}
    <line x1="90" y1="90" x2="90" y2="35" stroke="url(#lineGradient1)" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="90" y1="90" x2="135" y2="70" stroke="url(#lineGradient2)" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="90" y1="90" x2="125" y2="110" stroke="url(#lineGradient3)" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="90" y1="90" x2="50" y2="70" stroke="url(#lineGradient4)" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="90" y1="90" x2="55" y2="110" stroke="url(#lineGradient5)" strokeWidth="3.5" strokeLinecap="round" />
    
    {/* Finger joints with pulsing effect */}
    <circle cx="90" cy="35" r="6" fill="url(#jointGradient)" className="animate-pulse" />
    <circle cx="135" cy="70" r="6" fill="url(#jointGradient)" className="animate-pulse" />
    <circle cx="125" cy="110" r="6" fill="url(#jointGradient)" className="animate-pulse" />
    <circle cx="50" cy="70" r="6" fill="url(#jointGradient)" className="animate-pulse" />
    <circle cx="55" cy="110" r="6" fill="url(#jointGradient)" className="animate-pulse" />
    
    {/* Definitions for gradients */}
    <defs>
      <radialGradient id="radialGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(90 90) rotate(90) scale(60)">
        <stop stopColor="#8B5CF6" stopOpacity="0.3" />
        <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
      </radialGradient>
      
      <linearGradient id="circleGradient" x1="45" y1="45" x2="135" y2="135" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      
      <linearGradient id="centerGradient" x1="82" y1="82" x2="98" y2="98" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
      
      <linearGradient id="lineGradient1" x1="90" y1="90" x2="90" y2="35" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
      
      <linearGradient id="lineGradient2" x1="90" y1="90" x2="135" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      
      <linearGradient id="lineGradient3" x1="90" y1="90" x2="125" y2="110" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      
      <linearGradient id="lineGradient4" x1="90" y1="90" x2="50" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
      
      <linearGradient id="lineGradient5" x1="90" y1="90" x2="55" y2="110" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
      
      <linearGradient id="jointGradient" x1="0" y1="0" x2="12" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
  </svg>
);

export default HeroSection;
