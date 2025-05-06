
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Book, Layout, FileCode, Settings2, Database, Fingerprint, Layers, Server } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col gap-8">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">About ISL Translation System</h1>
          
          <p className="text-lg text-muted-foreground">
            Our ISL Translation System is a cutting-edge platform designed to bridge communication gaps between Indian Sign Language users and the hearing community. Using advanced AI and computer vision technology, we enable real-time translation of sign language to text and speech, making communication more accessible and inclusive.
          </p>
          
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl">Technology Stack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Code className="mr-2 h-5 w-5 text-primary" />
                  Frontend Framework
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {frontendTech.map((tech) => (
                    <TechBadge key={tech.name} name={tech.name} description={tech.description} />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-primary" />
                  Computer Vision & ML
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mlTech.map((tech) => (
                    <TechBadge key={tech.name} name={tech.name} description={tech.description} />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Database className="mr-2 h-5 w-5 text-primary" />
                  Data Management
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {dataTech.map((tech) => (
                    <TechBadge key={tech.name} name={tech.name} description={tech.description} />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Settings2 className="mr-2 h-5 w-5 text-primary" />
                  Development Tools
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {devTools.map((tech) => (
                    <TechBadge key={tech.name} name={tech.name} description={tech.description} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl">Project Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.title} className="space-y-3">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl">Supported Gestures</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Our system currently recognizes and translates the following gesture categories:
              </p>
              <div className="flex flex-wrap gap-2">
                {['Yes', 'No', 'Hello', 'Stop', 'I love you', 'Peace', 'Attention', 
                  'Below', 'Left', 'Right', 'Four', 'Three', 'Two', 'One', 
                  'Small', 'Big', 'Goodbye', 'Friend', 'A', 'B', 'C', 'D', 'E'].map((gesture) => (
                  <Badge key={gesture} className="bg-primary/10 hover:bg-primary/20 text-primary py-1.5">
                    {gesture}
                  </Badge>
                ))}
                <Badge className="bg-secondary/10 hover:bg-secondary/20 text-secondary py-1.5">
                  + Custom gestures via training
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center gap-4 pt-8">
            <Button asChild>
              <Link to="/">Try Demo</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechBadge = ({ name, description }: { name: string; description: string }) => (
  <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
    <h4 className="font-medium">{name}</h4>
    <p className="text-xs text-muted-foreground mt-1">{description}</p>
  </div>
);

const frontendTech = [
  { name: "React", description: "UI component library" },
  { name: "TypeScript", description: "Type-safe JavaScript" },
  { name: "Vite", description: "Build tooling" },
  { name: "Tailwind CSS", description: "Utility-first CSS" },
  { name: "Shadcn UI", description: "Component library" },
  { name: "React Router", description: "Navigation" },
  { name: "Lucide Icons", description: "Icon system" },
];

const mlTech = [
  { name: "MediaPipe", description: "Google's ML framework" },
  { name: "TensorFlow.js", description: "ML for the browser" },
  { name: "WebGL", description: "Hardware acceleration" },
  { name: "Custom Dataset", description: "User-defined gestures" },
  { name: "WebRTC", description: "Real-time communication" },
];

const dataTech = [
  { name: "Local Storage", description: "Client-side persistence" },
  { name: "IndexedDB", description: "Structured storage" },
  { name: "TanStack Query", description: "Data fetching" },
  { name: "JSON Export", description: "Data portability" },
];

const devTools = [
  { name: "ESLint", description: "Code linting" },
  { name: "Recharts", description: "Data visualization" },
  { name: "Web Speech API", description: "Text-to-speech" },
  { name: "Canvas API", description: "Drawing & visualization" },
];

const features = [
  {
    title: "Real-time Translation",
    description: "Experience instant translation of Indian Sign Language gestures to text and speech, powered by advanced AI algorithms.",
  },
  {
    title: "Custom Dataset Training",
    description: "Create your own sign language datasets and train personalized models for specialized gestures or regional variants.",
  },
  {
    title: "Voice Output",
    description: "Convert translated sign language to natural-sounding speech with adjustable voice characteristics.",
  },
  {
    title: "Analytics & Insights",
    description: "Track recognition accuracy and usage patterns with detailed analytics dashboards.",
  },
  {
    title: "Accessibility First",
    description: "Built with accessibility in mind, ensuring a seamless experience for all users regardless of their abilities.",
  },
  {
    title: "Privacy Focused",
    description: "Your privacy matters. All translations are processed securely and no personal data is stored without consent.",
  },
];

export default AboutPage;
