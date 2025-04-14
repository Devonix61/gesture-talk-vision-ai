
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
    <section className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                ISL Translation with{" "}
                <span className="bg-gradient-to-r from-isl-primary to-isl-secondary bg-clip-text text-transparent">
                  AI Voice
                </span>
              </h1>
              
              <p className="max-w-[600px] text-muted-foreground text-base md:text-xl">
                Breaking communication barriers with AI-powered sign language translation. Convert ISL gestures to text and natural speech in real-time.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleStartDemo}
                className="bg-isl-primary hover:bg-isl-primary/90 text-white"
                size="lg"
              >
                <Camera className="mr-2 h-5 w-5" />
                Try Live Demo
              </Button>
              
              <Button variant="outline" size="lg">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex -space-x-2">
                <img
                  alt="User"
                  className="rounded-full border-2 border-background w-8 h-8"
                  src="https://i.pravatar.cc/100?img=1"
                />
                <img
                  alt="User"
                  className="rounded-full border-2 border-background w-8 h-8"
                  src="https://i.pravatar.cc/100?img=2"
                />
                <img
                  alt="User"
                  className="rounded-full border-2 border-background w-8 h-8"
                  src="https://i.pravatar.cc/100?img=3"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Trusted by 10,000+ users worldwide
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-isl-primary to-isl-secondary animate-pulse-ring"></div>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
              <div className="flex h-full items-center justify-center bg-gradient-to-r from-slate-800 to-slate-950 text-white relative">
                <div className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex flex-col items-center">
                      <HandGestureIllustration />
                      <div className="mt-4 text-lg font-medium">ISL Gesture Recognition</div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 text-xs bg-isl-primary/80 px-2 py-1 rounded">
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

// Simple hand gesture SVG illustration
const HandGestureIllustration = () => (
  <svg 
    width="150" 
    height="150" 
    viewBox="0 0 150 150" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="animate-pulse"
  >
    <circle cx="75" cy="75" r="35" stroke="#8B5CF6" strokeWidth="2" />
    <circle cx="75" cy="75" r="6" fill="#3B82F6" />
    
    {/* Fingers */}
    <line x1="75" y1="75" x2="75" y2="30" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    <line x1="75" y1="75" x2="110" y2="60" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    <line x1="75" y1="75" x2="105" y2="90" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    <line x1="75" y1="75" x2="45" y2="60" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    <line x1="75" y1="75" x2="45" y2="90" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    
    {/* Finger joints */}
    <circle cx="75" cy="30" r="4" fill="#60A5FA" />
    <circle cx="110" cy="60" r="4" fill="#60A5FA" />
    <circle cx="105" cy="90" r="4" fill="#60A5FA" />
    <circle cx="45" cy="60" r="4" fill="#60A5FA" />
    <circle cx="45" cy="90" r="4" fill="#60A5FA" />
  </svg>
);

export default HeroSection;
