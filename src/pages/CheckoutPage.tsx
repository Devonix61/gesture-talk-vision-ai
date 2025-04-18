
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CheckoutPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const plan = queryParams.get('plan');
  const product = queryParams.get('product');
  
  const isAuthenticated = localStorage.getItem('isl-auth') === 'true';
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
    
    if (!plan && !product) {
      navigate('/pricing', { replace: true });
    }
  }, [isAuthenticated, plan, product, navigate]);
  
  const getCheckoutDetails = () => {
    if (plan === 'pro') {
      return {
        title: 'Pro Plan Subscription',
        price: '₹499/month',
        description: 'Professional features for regular users',
        isSubscription: true,
      };
    } else if (plan === 'enterprise') {
      return {
        title: 'Enterprise Plan Subscription',
        price: '₹999/month',
        description: 'Advanced features for heavy users and businesses',
        isSubscription: true,
      };
    } else if (product === 'package') {
      return {
        title: 'Translation Package',
        price: '₹1,999',
        description: 'One-time purchase for 100 premium translations',
        isSubscription: false,
      };
    } else if (product === 'education') {
      return {
        title: 'Educational License',
        price: '₹4,999',
        description: 'Perfect for schools and educational institutions',
        isSubscription: false,
      };
    }
    
    return {
      title: 'Unknown Product',
      price: '₹0',
      description: 'Please return to the pricing page and select a valid product.',
      isSubscription: false,
    };
  };
  
  const details = getCheckoutDetails();
  
  const handleCheckout = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // In a real implementation, this would call your Supabase Edge Function
      // that creates a Stripe checkout session
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now we'll just simulate a successful checkout
      // In a real implementation, you would redirect to the Stripe checkout URL
      
      // Simulate success redirect
      navigate('/checkout-success', { 
        state: { 
          product: details.title,
          isSubscription: details.isSubscription
        } 
      });
    } catch (err) {
      console.error('Checkout error:', err);
      setError('An error occurred during checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <Link to="/pricing">
        <Button variant="ghost" className="gap-2 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Pricing
        </Button>
      </Link>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Complete your purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="font-medium">{details.title}</div>
            <div className="text-2xl font-bold mt-1">{details.price}</div>
            <div className="text-muted-foreground text-sm mt-2">{details.description}</div>
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="text-sm text-muted-foreground">
            By proceeding with this purchase, you agree to our Terms of Service and Privacy Policy.
            {details.isSubscription && " You can cancel your subscription at any time from your account dashboard."}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleCheckout} 
            disabled={isProcessing} 
            className="w-full"
          >
            {isProcessing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Payment
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutPage;
