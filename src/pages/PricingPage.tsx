
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PricingFAQ from '@/components/PricingFAQ';

const PricingPage = () => {
  const isAuthenticated = localStorage.getItem('isl-auth') === 'true';

  return (
    <div className="container max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col gap-8">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the plan that best fits your needs. All plans include access to our core ISL translation features.
          </p>
        </div>
        
        {/* Subscription Plans */}
        <div className="grid gap-8 md:grid-cols-3 py-8">
          {/* Free Plan */}
          <PricingCard
            title="Free"
            price="₹0"
            description="Basic ISL translation features for casual users"
            features={[
              "Limited translations per day (10)",
              "Basic gesture recognition",
              "Text output only",
              "Community support"
            ]}
            ctaText="Get Started Free"
            ctaLink={isAuthenticated ? "/dashboard" : "/login"}
            popular={false}
          />
          
          {/* Pro Plan */}
          <PricingCard
            title="Pro"
            price="₹499"
            period="/month"
            description="Professional features for regular users"
            features={[
              "Unlimited translations",
              "Enhanced gesture accuracy",
              "Text and voice output",
              "Facial expression recognition",
              "Priority email support",
              "Historical translation storage"
            ]}
            ctaText="Subscribe Now"
            ctaLink={isAuthenticated ? "/checkout?plan=pro" : "/login?redirect=checkout?plan=pro"}
            popular={true}
          />
          
          {/* Enterprise Plan */}
          <PricingCard
            title="Enterprise"
            price="₹999"
            period="/month"
            description="Advanced features for heavy users and businesses"
            features={[
              "Everything in Pro",
              "API access",
              "Custom vocabulary support",
              "Multi-user accounts",
              "Dedicated account manager",
              "24/7 priority support",
              "Custom integrations"
            ]}
            ctaText="Contact Sales"
            ctaLink="/contact"
            popular={false}
          />
        </div>
        
        {/* One-time Purchase Options */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">One-Time Purchase Options</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <OneTimePurchaseCard
              title="Translation Package"
              price="₹1,999"
              description="One-time purchase for 100 premium translations"
              features={[
                "100 high-quality translations",
                "No expiration date",
                "Enhanced gesture recognition",
                "Export to multiple formats"
              ]}
              ctaText="Buy Now"
              ctaLink={isAuthenticated ? "/checkout?product=package" : "/login?redirect=checkout?product=package"}
            />
            
            <OneTimePurchaseCard
              title="Educational License"
              price="₹4,999"
              description="Perfect for schools and educational institutions"
              features={[
                "Full features for 1 year",
                "Up to 50 student accounts",
                "Teaching materials included",
                "Regular feature updates"
              ]}
              ctaText="Purchase License"
              ctaLink={isAuthenticated ? "/checkout?product=education" : "/login?redirect=checkout?product=education"}
            />
            
            <OneTimePurchaseCard
              title="Custom Integration"
              price="₹9,999"
              description="Custom integration for your software or application"
              features={[
                "API integration to your platform",
                "Developer support",
                "Custom feature development",
                "White-labeling options"
              ]}
              ctaText="Contact Us"
              ctaLink="/contact"
            />
          </div>
        </div>
        
        {/* FAQ Section */}
        <PricingFAQ />
      </div>
    </div>
  );
};

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
}

const PricingCard = ({ title, price, period = "", description, features, ctaText, ctaLink, popular = false }: PricingCardProps) => {
  return (
    <Card className={`flex flex-col h-full relative ${popular ? 'border-primary shadow-lg shadow-primary/20' : ''}`}>
      {popular && (
        <Badge className="absolute top-3 right-3 bg-primary">Most Popular</Badge>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
        <CardDescription className="pt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link to={ctaLink} className="w-full">
          <Button className={`w-full ${popular ? 'bg-primary hover:bg-primary/90' : ''}`}>
            {ctaText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

interface OneTimePurchaseCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

const OneTimePurchaseCard = ({ title, price, description, features, ctaText, ctaLink }: OneTimePurchaseCardProps) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant="outline" className="bg-secondary/10">One-Time</Badge>
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold">{price}</span>
        </div>
        <CardDescription className="pt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link to={ctaLink} className="w-full">
          <Button variant="outline" className="w-full">
            {ctaText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PricingPage;
