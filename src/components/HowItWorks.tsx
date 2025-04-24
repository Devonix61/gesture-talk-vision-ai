
import { useState } from 'react';
import { 
  BrainCircuit, 
  FileText, 
  Mic, 
  Waves,
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Waves,
    title: "Gesture Recognition",
    description: "Advanced AI detects and tracks hand movements, facial expressions, and posture in real-time.",
    details: "Using a custom-trained neural network model, our system captures subtle hand movements and gestures with exceptional accuracy. The recognition algorithm works across various lighting conditions and backgrounds.",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: BrainCircuit,
    title: "Neural Processing",
    description: "Deep learning models interpret the sign language gestures and convert them to semantic meaning.",
    details: "Our specialized transformer-based architecture analyzes sequential gestures and their contextual relationships. The model has been trained on over 10,000 hours of diverse ISL gestures to understand regional variations and nuances.",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: FileText,
    title: "Grammar Correction",
    description: "AI restructures the raw interpretation into grammatically correct sentences.",
    details: "A natural language processing module refines the translated content to ensure proper syntax, grammar, and contextual meaning. This step transforms fragmentary inputs into coherent communication.",
    color: "from-indigo-400 to-indigo-600"
  },
  {
    icon: Mic,
    title: "Voice Synthesis",
    description: "The translated text is converted to natural-sounding speech with appropriate emotion and intonation.",
    details: "Our emotional voice synthesis technology adds appropriate tone, pitch, and emotion to match the sentiment of the original signing. Users can customize voice characteristics to suit their preferences.",
    color: "from-sky-400 to-sky-600"
  }
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none"></div>
      <div className="absolute -bottom-32 left-1/3 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -top-32 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center space-y-4 mb-16 animate-slide-down">
          <div className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary mb-4 backdrop-blur-sm border border-secondary/10 transition-all duration-300 hover:bg-secondary/15">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
            Our Intelligent Process
          </div>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Our AI-powered system translates Indian Sign Language (ISL) to text and speech through a sophisticated multi-step process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center text-center space-y-6 p-6 rounded-xl backdrop-blur-sm border transition-all duration-500 animate-zoom-in card-highlight ${
                activeStep === index 
                  ? 'bg-white/70 dark:bg-gray-800/70 border-primary/30 shadow-lg transform scale-[1.03]' 
                  : 'bg-white/50 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/20 hover:shadow-lg hover:bg-white/60'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                <div className={`relative w-20 h-20 flex items-center justify-center bg-gradient-to-br ${step.color} rounded-full text-white shadow-lg transition-transform duration-500 ${activeStep === index ? 'scale-110' : 'scale-100'}`}>
                  <step.icon className="h-10 w-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-lg border-2 border-isl-primary flex items-center justify-center text-sm font-bold text-isl-primary">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              {activeStep === index && (
                <div className="mt-4 animate-fade-in">
                  <p className="text-sm text-muted-foreground mb-4">{step.details}</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-white/50 hover:bg-white/80">
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Connection lines between steps (visible on larger screens) */}
        <div className="hidden lg:block relative mt-8">
          <div className="absolute top-[-100px] left-[24%] w-[52%] h-1.5 bg-gradient-to-r from-isl-primary via-isl-secondary to-isl-accent opacity-30 rounded-full"></div>
        </div>
        
        {/* Enhanced Features Section */}
        <div className="mt-24 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-lg">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center md:text-left md:col-span-3">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-isl-primary to-isl-secondary bg-clip-text text-transparent">Enhanced Features</h3>
              <p className="text-muted-foreground">Our system goes beyond basic recognition with these advanced capabilities</p>
            </div>
            
            <FeatureCard 
              title="Custom Dataset Training"
              description="Personalized sign language models trained on your organization's specific needs and regional variations."
              gradient="from-sky-400 to-blue-600"
            />
            
            <FeatureCard 
              title="Contextual Understanding"
              description="AI that recognizes context to improve translation accuracy in complex conversations."
              gradient="from-violet-400 to-purple-600"
            />
            
            <FeatureCard 
              title="Multi-dialect Support"
              description="Recognition of regional ISL dialects and variations for broader accessibility."
              gradient="from-pink-400 to-rose-600"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  title, 
  description, 
  gradient 
}: { 
  title: string, 
  description: string, 
  gradient: string 
}) => {
  return (
    <div className="bg-white/50 dark:bg-gray-900/50 rounded-xl p-6 border border-white/20 dark:border-gray-800/20 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4`}>
        <BrainCircuit className="h-6 w-6" />
      </div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default HowItWorks;
