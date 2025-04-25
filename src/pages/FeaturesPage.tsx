
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, BrainCircuit, FileText, Mic, ScanFace, Languages, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-background/90">
      <Header />
      
      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl animate-pulse-slow" />
            <div className="absolute -bottom-24 right-1/3 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl animate-pulse-slow" />
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
              <Badge className="px-3 py-1 bg-primary/10 text-primary border-primary/20">Features</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Complete ISL Translation Features
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our comprehensive set of features designed to bridge communication gaps and empower ISL users with cutting-edge AI technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-isl-primary to-isl-secondary group">
                    Try It Yourself
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg" className="group">
                    View Pricing
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Filter */}
        <section className="py-10">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center mb-12">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All Features</TabsTrigger>
                  <TabsTrigger value="translation">Translation</TabsTrigger>
                  <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                  <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <TabsContent value="all" className="animate-fade-in">
              <FeatureGrid features={allFeatures} />
            </TabsContent>
            
            <TabsContent value="translation" className="animate-fade-in">
              <FeatureGrid features={translationFeatures} />
            </TabsContent>
            
            <TabsContent value="accessibility" className="animate-fade-in">
              <FeatureGrid features={accessibilityFeatures} />
            </TabsContent>
            
            <TabsContent value="enterprise" className="animate-fade-in">
              <FeatureGrid features={enterpriseFeatures} />
            </TabsContent>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get answers to common questions about our ISL translation features
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How accurate is the ISL recognition?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our system achieves 95-99% accuracy in controlled environments and 85-90% 
                    accuracy in real-world settings. The AI continuously learns and improves with use, 
                    adapting to individual signing styles over time.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Does the system work in low-light conditions?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, our advanced computer vision algorithms are designed to function in various 
                    lighting conditions. However, for optimal performance, we recommend using the system 
                    in well-lit environments. The mobile app includes automatic lighting enhancement features.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Can I customize the AI voice output?
                  </AccordionTrigger>
                  <AccordionContent>
                    Absolutely! You can choose from a variety of voice options across different 
                    genders, accents, and styles. Premium users can also adjust parameters like speed, pitch, 
                    and emotional tone to create a more personalized experience.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Which ISL dialects are supported?
                  </AccordionTrigger>
                  <AccordionContent>
                    We currently support the standard Indian Sign Language along with regional variations 
                    from Northern, Southern, Eastern, and Western India. Our system is continually expanding 
                    its dialect recognition capabilities through our community contribution program.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    How can I train the system on custom signs?
                  </AccordionTrigger>
                  <AccordionContent>
                    Business and Enterprise users can access our Custom Training Portal to upload 
                    video samples of specialized signs specific to their organization or industry. 
                    Our AI will incorporate these into a custom model for your account, typically 
                    requiring 10-20 examples per sign for optimal recognition.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const FeatureGrid = ({ features }: { features: FeatureItem[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {features.map((feature, index) => (
      <FeatureCard key={index} feature={feature} index={index} />
    ))}
  </div>
);

interface FeatureItem {
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  category: string;
  benefits: string[];
  isPremium?: boolean;
}

const FeatureCard = ({ feature, index }: { feature: FeatureItem; index: number }) => {
  const Icon = feature.icon;
  
  return (
    <Card className="border border-border/50 hover:border-primary/20 transition-all duration-300 overflow-hidden h-full bg-card/80 hover:bg-card animate-fade-in"
         style={{ animationDelay: `${index * 100}ms` }}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="rounded-lg p-2 bg-gradient-to-br from-primary to-secondary text-white">
            <Icon className="h-5 w-5" />
          </div>
          
          {feature.isPremium && (
            <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">
              Premium
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
              <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button variant="outline" className="w-full group" size="sm">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Feature data
const allFeatures: FeatureItem[] = [
  {
    title: "Real-time ISL Recognition",
    description: "Instantly recognize and translate Indian Sign Language gestures",
    icon: Camera,
    category: "translation",
    benefits: [
      "Ultra-low latency processing",
      "Works offline for basic translations",
      "Optimized for mobile devices"
    ]
  },
  {
    title: "Neural Language Processing",
    description: "Deep learning models for accurate contextual translations",
    icon: BrainCircuit,
    category: "translation",
    benefits: [
      "Context-aware translations",
      "Continuous learning algorithms",
      "Handling of complex grammar structures"
    ],
    isPremium: true
  },
  {
    title: "Facial Expression Analysis",
    description: "Capture crucial non-manual features in sign language",
    icon: ScanFace,
    category: "translation",
    benefits: [
      "Sentiment detection",
      "Question type recognition",
      "Enhanced contextual understanding"
    ]
  },
  {
    title: "Voice Synthesis",
    description: "Convert translations to natural speech in real-time",
    icon: Mic,
    category: "accessibility",
    benefits: [
      "Multiple voice options",
      "Emotion-aware delivery",
      "Adjustable speaking rate"
    ]
  },
  {
    title: "Multi-language Output",
    description: "Translate ISL to multiple written and spoken languages",
    icon: Languages,
    category: "accessibility",
    benefits: [
      "Support for 12+ languages",
      "Regional dialect awareness",
      "Technical vocabulary handling"
    ],
    isPremium: true
  },
  {
    title: "Documentation & Records",
    description: "Save, organize and refer to past translations",
    icon: FileText,
    category: "enterprise",
    benefits: [
      "Cloud storage integration",
      "Organization and search capabilities",
      "Export in multiple formats"
    ]
  }
  // Add more features as needed
];

// Filtered feature sets
const translationFeatures = allFeatures.filter(f => f.category === "translation");
const accessibilityFeatures = allFeatures.filter(f => f.category === "accessibility");
const enterpriseFeatures = allFeatures.filter(f => f.category === "enterprise");

export default FeaturesPage;
