
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { LucideIcon } from 'lucide-react';

interface StepProps {
  step: {
    icon: LucideIcon;
    title: string;
    description: string;
    details: string;
    color: string;
    extendedContent: string;
  };
  index: number;
}

const StepCard = ({ step, index }: StepProps) => {
  const [isActive, setIsActive] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div 
      className={`flex flex-col items-center text-center space-y-6 p-6 rounded-xl backdrop-blur-sm border transition-all duration-500 animate-zoom-in card-highlight ${
        isActive 
          ? 'bg-white/70 dark:bg-gray-800/70 border-primary/30 shadow-lg transform scale-[1.03]' 
          : 'bg-white/50 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/20 hover:shadow-lg hover:bg-white/60'
      }`}
      style={{ animationDelay: `${index * 150}ms`, position: 'relative', zIndex: 20 }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
        <div className={`relative w-20 h-20 flex items-center justify-center bg-gradient-to-br ${step.color} rounded-full text-white shadow-lg transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}>
          <step.icon className="h-10 w-10" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-lg border-2 border-isl-primary flex items-center justify-center text-sm font-bold text-isl-primary">
          {index + 1}
        </div>
      </div>
      <h3 className="text-xl font-semibold">{step.title}</h3>
      <p className="text-muted-foreground">{step.description}</p>
      
      {isActive && (
        <div className="mt-4 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-4">{step.details}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 bg-white/50 hover:bg-white/80 group relative z-30"
            onClick={() => setOpenDialog(true)}
          >
            Learn More
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className={`w-10 h-10 flex items-center justify-center bg-gradient-to-br ${step.color} rounded-full text-white`}>
                <step.icon className="h-5 w-5" />
              </div>
              {step.title}
            </DialogTitle>
            <DialogDescription className="text-lg">
              {step.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p>{step.details}</p>
            <p className="text-muted-foreground">{step.extendedContent}</p>
            
            <div className="bg-muted/30 p-4 rounded-lg border border-border mt-4">
              <h4 className="font-medium mb-2">Technical Specifications</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>99.2% accuracy in controlled environments</li>
                <li>Processes 30 frames per second</li>
                <li>Supports multiple Indian Sign Language dialects</li>
                <li>Adapts to user's signing style over time</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StepCard;
