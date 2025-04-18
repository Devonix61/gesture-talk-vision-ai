
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import FeatureHighlights from '@/components/FeatureHighlights';
import HandGestureRecognizer from '@/components/HandGestureRecognizer';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background/90 to-background/80">
      <Header />
      <main className="flex-1">
        <HeroSection />
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none" />
          <HowItWorks />
        </div>
        
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent pointer-events-none" />
          <FeatureHighlights />
        </div>
        
        <section id="demo-section" className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-secondary/5 pointer-events-none" />
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4 animate-fade-in">
                Live Demo
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Experience ISL Translation
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                Try our real-time ISL translation system directly in your browser.
                Use sign language gestures and see them translated instantly.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl relative mb-8">
              <HandGestureRecognizer />
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-6">
                Note: This is a simplified demo version. The full system includes more advanced features like 
                facial expression analysis, AI voice customization, and more.
              </p>
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Access Full Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
