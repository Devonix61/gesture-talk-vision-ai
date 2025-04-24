
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  CircleUserRound, 
  HandMetal, 
  Headphones, 
  Languages, 
  MicVocal,
  Phone, 
  ScanFace, 
  Sparkles,
  Vegan
} from 'lucide-react';

const features = [
  {
    title: "Gesture Recognition",
    description: "Advanced hand tracking detects ISL gestures with high accuracy.",
    icon: HandMetal
  },
  {
    title: "Facial Expression Analysis",
    description: "Captures non-manual features crucial for meaning in sign language.",
    icon: ScanFace
  },
  {
    title: "AI Voice Synthesis",
    description: "Converts sign language to natural-sounding speech in real-time.",
    icon: MicVocal
  },
  {
    title: "Real-Time Translation",
    description: "ISL grammar correction for accurate textual representation.",
    icon: Languages
  },
  {
    title: "Voice Call Support",
    description: "Make phone calls using sign language with AI-powered voice.",
    icon: Phone
  },
  {
    title: "Speech-to-Text for Deaf Users",
    description: "Converts others' speech to text during calls and conversations.",
    icon: Headphones
  },
  {
    title: "Personalized AI Voice",
    description: "Custom voice profiles based on user preferences.",
    icon: CircleUserRound
  },
  {
    title: "BCI Integration",
    description: "Optional brainwave interface compatibility for enhanced control.",
    icon: Brain
  },
  {
    title: "Emotion Detection",
    description: "AI modulates voice tone based on detected emotions in signing.",
    icon: Vegan
  },
  {
    title: "Smart Predictions",
    description: "AI learns and predicts frequently used gestures and phrases.",
    icon: Sparkles
  }
];

const FeatureHighlights = () => {
  return (
    <section className="relative py-24 overflow-visible" id="features-section">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-isl-primary via-isl-secondary to-isl-accent bg-clip-text text-transparent">
            Breaking Communication Barriers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our advanced ISL Translation System combines cutting-edge AI with gesture recognition to create seamless communication.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in [--animation-delay:200ms]">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border border-primary/10 bg-background/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-isl-primary/20 to-isl-secondary/20 p-2.5 rounded-xl">
                    <feature.icon className="h-6 w-6 text-isl-primary" />
                  </div>
                  <CardTitle className="text-xl bg-gradient-to-r from-isl-primary to-isl-secondary bg-clip-text text-transparent">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground/90">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
