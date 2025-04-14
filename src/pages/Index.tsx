
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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <FeatureHighlights />
        
        <section id="demo-section" className="py-16 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
                Live Demo
              </div>
              <h2 className="text-3xl font-bold">Experience ISL Translation</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Try our real-time ISL translation system directly in your browser.
                Use sign language gestures and see them translated instantly.
              </p>
            </div>
            
            <HandGestureRecognizer />
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>
                Note: This is a simplified demo version. The full system includes more advanced features like 
                facial expression analysis, AI voice customization, and more.
              </p>
              <div className="mt-6 flex justify-center">
                <Link to="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90">
                    Access Full Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
