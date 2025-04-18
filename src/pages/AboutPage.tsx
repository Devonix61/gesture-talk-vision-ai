
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="space-y-3">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Real-time Translation",
    description: "Experience instant translation of Indian Sign Language gestures to text and speech, powered by advanced AI algorithms.",
  },
  {
    title: "Accessibility First",
    description: "Built with accessibility in mind, ensuring a seamless experience for all users regardless of their abilities.",
  },
  {
    title: "Privacy Focused",
    description: "Your privacy matters. All translations are processed securely and no personal data is stored without consent.",
  },
  {
    title: "Cross-platform Support",
    description: "Access the translation system from any device with a web browser and camera capabilities.",
  },
  {
    title: "Continuous Learning",
    description: "Our AI models continuously improve through machine learning to provide more accurate translations.",
  },
  {
    title: "Community Driven",
    description: "Built with input from the deaf community to ensure practical and meaningful functionality.",
  },
];

export default AboutPage;
