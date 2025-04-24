
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleStartDemo = () => {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl animate-pulse-slow delay-700" />
        <div className="absolute left-1/3 bottom-1/4 w-48 h-48 bg-accent/5 rounded-full filter blur-3xl animate-pulse-slow delay-[1400ms]" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8 z-10 animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 rounded-full pl-2 pr-5 py-1.5 w-fit animate-slide-in-left">
              <span className="bg-primary/20 rounded-full p-1.5">
                <Camera className="h-4 w-4 text-primary" />
              </span>
              <span className="text-sm font-medium text-primary/80">AI-Powered Sign Language Recognition</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                Breaking Barriers with{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-isl-primary via-isl-secondary to-isl-accent bg-clip-text text-transparent">
                    Smart Sign
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-isl-primary via-isl-secondary to-isl-accent opacity-50 rounded-full"></span>
                </span>{" "}
                Recognition
              </h1>
              
              <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                Our advanced AI technology translates Indian Sign Language (ISL) into text and natural 
                speech in real-time, empowering seamless communication for all.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button 
                onClick={handleStartDemo}
                className="btn-primary group text-lg py-6 px-8"
                size="lg"
              >
                <span className="relative z-10 flex items-center">
                  <Camera className="mr-2 h-5 w-5 group-hover:animate-bounce-subtle" />
                  Try Live Demo
                </span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary/20 bg-white/5 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 text-lg py-6 px-8 group"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 bg-white/10 backdrop-blur-sm border border-primary/10 rounded-xl p-5 animate-fade-in shadow-sm">
              <div className="flex -space-x-4">
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-isl-primary to-isl-secondary p-0.5">
                  <img
                    alt="User"
                    className="rounded-full w-full h-full object-cover"
                    src="https://i.pravatar.cc/100?img=1"
                  />
                </div>
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-isl-primary to-isl-secondary p-0.5 z-10">
                  <img
                    alt="User"
                    className="rounded-full w-full h-full object-cover"
                    src="https://i.pravatar.cc/100?img=2"
                  />
                </div>
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-isl-primary to-isl-secondary p-0.5 z-20">
                  <img
                    alt="User"
                    className="rounded-full w-full h-full object-cover"
                    src="https://i.pravatar.cc/100?img=3"
                  />
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold">Trusted by 10,000+ users worldwide</div>
                <div className="text-xs text-muted-foreground">Join our inclusive communication movement today</div>
              </div>
            </div>
          </div>
          
          <div 
            className="relative z-10 animate-slide-up delay-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-isl-primary via-isl-secondary to-isl-accent opacity-75 blur-md animate-pulse-slow transition-all duration-300"></div>
            <div className={`relative aspect-video overflow-hidden rounded-xl bg-muted shadow-2xl transition-all duration-500 transform ${isHovered ? 'scale-[1.02]' : ''}`}>
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-isl-dark via-gray-900 to-slate-900 text-white relative">
                <div className="p-8 text-center">
                  <div className="flex justify-center mb-8">
                    <div className="flex flex-col items-center">
                      <EnhancedHandGestureIllustration isHovered={isHovered} />
                      <div className="mt-8 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white">
                        ISL Gesture Recognition
                      </div>
                      <div className="text-sm text-slate-300 mt-3 max-w-sm opacity-80">
                        Our neural network precisely identifies and interprets sign language with 
                        high accuracy, even in challenging lighting conditions
                      </div>
                      <div className="mt-8">
                        <Button 
                          variant="outline" 
                          className="border-white/20 text-white hover:bg-white/10 transition-colors group"
                        >
                          <span>Watch Demo</span>
                          <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-xs bg-gradient-to-r from-isl-primary to-isl-secondary px-3 py-1.5 rounded-full font-medium">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  <span>AI-Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced animated hand gesture SVG illustration
const EnhancedHandGestureIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <svg 
    width="220" 
    height="220" 
    viewBox="0 0 220 220" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-700 ${isHovered ? 'animate-pulse' : 'animate-float'}`}
  >
    {/* Background glow effect */}
    <circle cx="110" cy="110" r="80" fill="url(#radialGlowEnhanced)" className="animate-pulse-slow" />
    
    {/* Outer circle */}
    <circle 
      cx="110" 
      cy="110" 
      r="65" 
      stroke="url(#circleGradientEnhanced)" 
      strokeWidth="1.5" 
      strokeDasharray="6 3" 
      className="animate-spin-slow" 
      opacity="0.7"
    />
    <circle 
      cx="110" 
      cy="110" 
      r="55" 
      stroke="url(#circleGradientEnhanced2)" 
      strokeWidth="1" 
      strokeDasharray="3 2" 
      className="animate-spin-slow" 
      style={{ animationDirection: 'reverse', animationDuration: '20s' }} 
      opacity="0.5"
    />
    
    {/* Center circle */}
    <circle cx="110" cy="110" r="10" fill="url(#centerGradientEnhanced)" className={isHovered ? 'animate-pulse' : ''} />
    
    {/* Fingers with animated gradients */}
    <g className={isHovered ? 'animate-bounce-subtle' : ''} style={{ animationDelay: '100ms' }}>
      <line x1="110" y1="110" x2="110" y2="45" stroke="url(#lineGradientEnhanced1)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="110" cy="45" r="7" fill="url(#jointGradientEnhanced)" className="animate-pulse" />
    </g>
    
    <g className={isHovered ? 'animate-bounce-subtle' : ''} style={{ animationDelay: '200ms' }}>
      <line x1="110" y1="110" x2="165" y2="75" stroke="url(#lineGradientEnhanced2)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="165" cy="75" r="7" fill="url(#jointGradientEnhanced)" className="animate-pulse" />
    </g>
    
    <g className={isHovered ? 'animate-bounce-subtle' : ''} style={{ animationDelay: '300ms' }}>
      <line x1="110" y1="110" x2="150" y2="140" stroke="url(#lineGradientEnhanced3)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="150" cy="140" r="7" fill="url(#jointGradientEnhanced)" className="animate-pulse" />
    </g>
    
    <g className={isHovered ? 'animate-bounce-subtle' : ''} style={{ animationDelay: '400ms' }}>
      <line x1="110" y1="110" x2="55" y2="75" stroke="url(#lineGradientEnhanced4)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="55" cy="75" r="7" fill="url(#jointGradientEnhanced)" className="animate-pulse" />
    </g>
    
    <g className={isHovered ? 'animate-bounce-subtle' : ''} style={{ animationDelay: '500ms' }}>
      <line x1="110" y1="110" x2="70" y2="140" stroke="url(#lineGradientEnhanced5)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="70" cy="140" r="7" fill="url(#jointGradientEnhanced)" className="animate-pulse" />
    </g>
    
    {/* Connection lines between fingers */}
    {isHovered && (
      <>
        <path 
          d="M110 45 C140 55, 150 65, 165 75" 
          stroke="url(#connectionGradient)" 
          strokeWidth="1.5" 
          strokeDasharray="3 2"
          strokeLinecap="round" 
          fill="none" 
          opacity="0.5"
        />
        <path 
          d="M165 75 C160 95, 155 115, 150 140" 
          stroke="url(#connectionGradient)" 
          strokeWidth="1.5" 
          strokeDasharray="3 2"
          strokeLinecap="round" 
          fill="none" 
          opacity="0.5"
        />
        <path 
          d="M150 140 C120 150, 90 150, 70 140" 
          stroke="url(#connectionGradient)" 
          strokeWidth="1.5" 
          strokeDasharray="3 2"
          strokeLinecap="round" 
          fill="none" 
          opacity="0.5"
        />
        <path 
          d="M70 140 C65 115, 60 95, 55 75" 
          stroke="url(#connectionGradient)" 
          strokeWidth="1.5" 
          strokeDasharray="3 2"
          strokeLinecap="round" 
          fill="none" 
          opacity="0.5"
        />
        <path 
          d="M55 75 C70 65, 90 50, 110 45" 
          stroke="url(#connectionGradient)" 
          strokeWidth="1.5" 
          strokeDasharray="3 2"
          strokeLinecap="round" 
          fill="none" 
          opacity="0.5"
        />
      </>
    )}
    
    {/* Neural network-like particles */}
    {isHovered && (
      <>
        <circle cx="120" cy="60" r="2" fill="#60A5FA" className="animate-pulse"/>
        <circle cx="140" cy="90" r="2" fill="#818CF8" className="animate-pulse"/>
        <circle cx="130" cy="130" r="2" fill="#A78BFA" className="animate-pulse"/>
        <circle cx="90" cy="130" r="2" fill="#C4B5FD" className="animate-pulse"/>
        <circle cx="80" cy="90" r="2" fill="#DDD6FE" className="animate-pulse"/>
        <circle cx="90" cy="70" r="2" fill="#93C5FD" className="animate-pulse"/>
      </>
    )}
    
    {/* Definitions for enhanced gradients */}
    <defs>
      <radialGradient id="radialGlowEnhanced" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(110 110) rotate(90) scale(80)">
        <stop stopColor="#8B5CF6" stopOpacity="0.4" />
        <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
      </radialGradient>
      
      <linearGradient id="circleGradientEnhanced" x1="45" y1="45" x2="175" y2="175" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="0.5" stopColor="#818CF8" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      
      <linearGradient id="circleGradientEnhanced2" x1="45" y1="175" x2="175" y2="45" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="0.5" stopColor="#A78BFA" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      
      <linearGradient id="centerGradientEnhanced" x1="100" y1="100" x2="120" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#93C5FD" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
      
      <linearGradient id="lineGradientEnhanced1" x1="110" y1="110" x2="110" y2="45" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
      
      <linearGradient id="lineGradientEnhanced2" x1="110" y1="110" x2="165" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      
      <linearGradient id="lineGradientEnhanced3" x1="110" y1="110" x2="150" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      
      <linearGradient id="lineGradientEnhanced4" x1="110" y1="110" x2="55" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
      
      <linearGradient id="lineGradientEnhanced5" x1="110" y1="110" x2="70" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
      
      <linearGradient id="jointGradientEnhanced" x1="0" y1="0" x2="14" y2="14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#93C5FD" />
        <stop offset="1" stopColor="#A78BFA" />
      </linearGradient>
      
      <linearGradient id="connectionGradient" x1="55" y1="75" x2="165" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" stopOpacity="0.2" />
        <stop offset="0.5" stopColor="#A78BFA" stopOpacity="0.7" />
        <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
);

export default HeroSection;
