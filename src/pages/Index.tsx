
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import FeatureHighlights from '@/components/FeatureHighlights';
import HandGestureRecognizer from '@/components/HandGestureRecognizer';
import DatasetTraining from '@/components/DatasetTraining';
import Footer from '@/components/Footer';
import FeaturesSection from '@/components/FeaturesSection';
import VoiceCallSupport from '@/components/VoiceCallSupport';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const [showDatasetTraining, setShowDatasetTraining] = useState(false);
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background/95 to-background/90">
      <Header />
      <main className="flex-1">
        <HeroSection />
        
        <div className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 pointer-events-none blur-3xl opacity-40" />
          <HowItWorks />
        </div>
        
        <FeaturesSection />
        
        <div className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background/95 pointer-events-none" />
          <FeatureHighlights />
        </div>
        
        <section id="demo-section" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-secondary/5 pointer-events-none" />
          <div className="absolute -left-32 top-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow" />
          <div className="absolute -right-32 bottom-1/4 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow" />
          
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center space-y-6 mb-16 animate-slide-down">
              <div className="inline-block rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4 hover:bg-primary/20 transition-colors duration-300 backdrop-blur-sm border border-primary/10">
                Live Demo
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Experience ISL Translation
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                Try our real-time ISL translation system directly in your browser.
                Use sign language gestures and see them translated instantly.
              </p>
            </div>
            
            <div className="glass-card p-6 md:p-8 rounded-2xl relative mb-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 backdrop-blur-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl opacity-70" />
              <HandGestureRecognizer />
            </div>
            
            <div className="flex flex-col items-center space-y-10 mt-20">
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={() => setShowDatasetTraining(!showDatasetTraining)}
                  className="bg-gradient-to-r from-isl-primary to-isl-secondary text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl py-6 px-8 text-lg"
                >
                  {showDatasetTraining ? "Hide Dataset Training" : "Create Custom Dataset"}
                </Button>
                
                <Button 
                  onClick={() => setShowVoiceCall(!showVoiceCall)}
                  className="bg-gradient-to-r from-isl-secondary to-isl-accent text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl py-6 px-8 text-lg"
                >
                  {showVoiceCall ? "Hide Voice Call" : "Try Voice Call Support"}
                </Button>
              </div>
              
              {showDatasetTraining && (
                <div className="w-full mt-8 animate-slide-down">
                  <DatasetTraining />
                </div>
              )}
              
              {showVoiceCall && (
                <div className="w-full max-w-2xl mt-8 animate-slide-down">
                  <VoiceCallSupport />
                </div>
              )}
              
              <div className="text-center max-w-2xl">
                <p className="text-sm text-muted-foreground mb-6">
                  Note: This is a simplified demo version. The full system includes more advanced features like 
                  facial expression analysis, AI voice customization, and more.
                </p>
                <Link to="/dashboard">
                  <Button 
                    className="bg-gradient-to-r from-primary via-secondary to-accent text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl group"
                    size="lg"
                  >
                    Access Full Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
