
import { 
  BrainCircuit, 
  FileText, 
  Mic, 
  Waves 
} from "lucide-react";

const steps = [
  {
    icon: Waves,
    title: "Gesture Recognition",
    description: "Advanced AI detects and tracks hand movements, facial expressions, and posture in real-time."
  },
  {
    icon: BrainCircuit,
    title: "Neural Processing",
    description: "Deep learning models interpret the sign language gestures and convert them to semantic meaning."
  },
  {
    icon: FileText,
    title: "Grammar Correction",
    description: "AI restructures the raw interpretation into grammatically correct sentences."
  },
  {
    icon: Mic,
    title: "Voice Synthesis",
    description: "The translated text is converted to natural-sounding speech with appropriate emotion and intonation."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none"></div>
      <div className="absolute -bottom-32 left-1/3 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -top-32 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary mb-4 backdrop-blur-sm border border-secondary/10">
            Our Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Our AI-powered system translates Indian Sign Language (ISL) to text and speech through a sophisticated multi-step process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center space-y-6 p-6 rounded-xl bg-white/50 dark:bg-gray-800/20 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-isl-primary to-isl-secondary rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-isl-primary to-isl-secondary rounded-full text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white dark:bg-gray-800 shadow-lg border-2 border-isl-primary flex items-center justify-center text-sm font-bold text-isl-primary">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Connection lines between steps (visible on larger screens) */}
        <div className="hidden lg:block relative mt-8">
          <div className="absolute top-[-100px] left-[24%] w-[52%] h-1 bg-gradient-to-r from-isl-primary via-isl-secondary to-isl-accent opacity-30 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
