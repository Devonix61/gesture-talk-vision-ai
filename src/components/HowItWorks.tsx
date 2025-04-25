
import StepCard from "./how-it-works/StepCard";
import { steps } from "./how-it-works/steps";

const HowItWorks = () => {
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
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
