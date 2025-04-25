
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  Mic, 
  Smartphone, 
  Globe, 
  Server, 
  BarChart, 
  Users, 
  FileText, 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { motion } from '@/components/ui/motion';
import { Link } from 'react-router-dom';

const features = {
  core: [
    {
      title: "Real-time Translation",
      description: "Convert ISL to text and speech instantly with low latency processing",
      icon: Camera,
      color: "from-blue-500 to-cyan-500",
      benefits: [
        "Instant translation with minimal delay",
        "Works on mobile, tablet, and desktop",
        "No internet required for basic translations"
      ],
      popular: true
    },
    {
      title: "Voice Synthesis",
      description: "Natural sounding speech output with emotional context preservation",
      icon: Mic,
      color: "from-purple-500 to-indigo-500",
      benefits: [
        "Multiple voice options",
        "Emotional tone matching",
        "Adjustable speech parameters"
      ],
      popular: false
    },
    {
      title: "Mobile Compatible",
      description: "Use on any device with a camera including smartphones and tablets",
      icon: Smartphone,
      color: "from-orange-500 to-amber-500",
      benefits: [
        "Works on iOS and Android",
        "Optimized for mobile processors",
        "Battery efficient operation"
      ],
      popular: false
    },
    {
      title: "Multi-dialect Support",
      description: "Recognition of regional ISL variations and dialects",
      icon: Globe,
      color: "from-green-500 to-emerald-500",
      benefits: [
        "Supports multiple ISL dialects",
        "Regional variation awareness",
        "Continuous learning system"
      ],
      popular: true
    }
  ],
  advanced: [
    {
      title: "Custom AI Models",
      description: "Train the system on specific vocabularies or organizational needs",
      icon: Server,
      color: "from-rose-500 to-pink-500",
      benefits: [
        "Domain-specific vocabulary",
        "Custom gesture recognition",
        "Organizational integration"
      ]
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive usage statistics and performance metrics",
      icon: BarChart,
      color: "from-fuchsia-500 to-purple-500",
      benefits: [
        "Usage tracking",
        "Accuracy metrics",
        "Performance analysis"
      ]
    },
    {
      title: "Team Collaboration",
      description: "Share translations and collaborate with team members",
      icon: Users,
      color: "from-sky-500 to-indigo-500",
      benefits: [
        "User management",
        "Shared libraries",
        "Permission controls"
      ]
    },
    {
      title: "Documentation Tools",
      description: "Save, export, and manage translations for future reference",
      icon: FileText,
      color: "from-violet-500 to-purple-500",
      benefits: [
        "Export to multiple formats",
        "Library organization",
        "Search capabilities"
      ]
    }
  ],
  enterprise: [
    {
      title: "Neural Language Processing",
      description: "Enterprise-grade NLP for complex translations and contextual understanding",
      icon: BrainCircuit,
      color: "from-indigo-500 to-blue-500",
      benefits: [
        "Deep contextual analysis",
        "Intent recognition",
        "Semantic processing"
      ]
    },
    {
      title: "API Integration",
      description: "Connect to existing systems via our comprehensive API",
      icon: Server,
      color: "from-emerald-500 to-green-500",
      benefits: [
        "RESTful API endpoints",
        "Event webhooks",
        "Custom integrations"
      ]
    }
  ]
};

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('core');

  const handleLearnMore = (title: string) => {
    toast.info(`Learn more about ${title}`, {
      description: "Detailed documentation is available in your dashboard",
      action: {
        label: "View Docs",
        onClick: () => console.log(`Viewing docs for ${title}`)
      }
    });
  };

  return (
    <section id="features" className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-4 animate-fade-in">
          <Badge variant="outline" className="px-3 py-1 backdrop-blur-sm bg-background/50 border-primary/20">
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-isl-primary via-isl-secondary to-isl-accent bg-clip-text text-transparent">
            Powerful Sign Language Tools
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Our platform offers comprehensive tools for ISL translation and communication, from basic recognition to enterprise solutions.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3 h-12">
              <TabsTrigger value="core" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Core Features
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Advanced
              </TabsTrigger>
              <TabsTrigger value="enterprise" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Enterprise
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="core" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.core.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  feature={feature}
                  isActive={activeFeature === index}
                  onMouseEnter={() => setActiveFeature(index)}
                  onMouseLeave={() => setActiveFeature(null)}
                  onLearnMore={() => handleLearnMore(feature.title)}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.advanced.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  feature={feature}
                  isActive={activeFeature === index + 4}
                  onMouseEnter={() => setActiveFeature(index + 4)}
                  onMouseLeave={() => setActiveFeature(null)}
                  onLearnMore={() => handleLearnMore(feature.title)}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="enterprise" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.enterprise.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  feature={feature}
                  isActive={activeFeature === index + 8}
                  onMouseEnter={() => setActiveFeature(index + 8)}
                  onMouseLeave={() => setActiveFeature(null)}
                  onLearnMore={() => handleLearnMore(feature.title)}
                  index={index}
                  wide
                />
              ))}
            </div>
            
            <div className="mt-10 bg-muted/30 border border-border/50 rounded-lg p-8 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold">Enterprise Solutions</h3>
                  <p className="text-muted-foreground mt-2">
                    Custom implementation, dedicated support, and SLA guarantees for organizations.
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-isl-primary to-isl-secondary group"
                  onClick={() => toast.success("Enterprise contact request submitted", {
                    description: "Our sales team will reach out to you shortly."
                  })}
                >
                  Contact Sales
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
};

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    benefits: string[];
    popular?: boolean;
  };
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLearnMore: () => void;
  index: number;
  wide?: boolean;
}

const FeatureCard = ({ feature, isActive, onMouseEnter, onMouseLeave, onLearnMore, index, wide = false }: FeatureCardProps) => {
  const Icon = feature.icon;
  
  return (
    <Card 
      className={`border border-border/50 hover:border-primary/20 transition-all duration-300 overflow-hidden h-full bg-card/80 hover:bg-card ${wide ? 'md:col-span-1' : ''}`}
      style={{ animationDelay: `${index * 150}ms` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 ${isActive ? 'opacity-5' : ''}`} />
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className={`rounded-lg p-2 bg-gradient-to-br ${feature.color} text-white`}>
            <Icon className="h-5 w-5" />
          </div>
          
          {feature.popular && (
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              Popular
            </Badge>
          )}
        </div>
        <CardTitle className="mt-4">{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {feature.benefits.map((benefit, i) => (
            <div key={i} className="flex items-start">
              <CheckCircle className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          variant="outline" 
          className="w-full group" 
          size="sm"
          onClick={onLearnMore}
        >
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeaturesSection;
