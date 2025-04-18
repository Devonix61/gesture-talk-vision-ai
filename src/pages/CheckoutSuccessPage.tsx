
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

const CheckoutSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { product: string; isSubscription: boolean } | null;
  
  useEffect(() => {
    if (!state) {
      navigate('/pricing', { replace: true });
      return;
    }
    
    // Show success toast
    toast.success('Payment Successful!', {
      description: `Thank you for your purchase. Your ${state.isSubscription ? 'subscription' : 'purchase'} is now active.`,
      duration: 5000,
    });
  }, [state, navigate]);
  
  if (!state) return null;
  
  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <Card className="w-full text-center">
        <CardHeader>
          <div className="mx-auto my-4 bg-green-100 p-2 rounded-full w-16 h-16 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Thank you for your purchase of:</p>
          <div className="font-medium text-xl">{state.product}</div>
          
          <div className="bg-muted/30 p-4 rounded-lg text-left">
            <p className="font-medium">What happens next?</p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-disc list-inside">
              {state.isSubscription ? (
                <>
                  <li>Your subscription is now active</li>
                  <li>You'll receive a confirmation email shortly</li>
                  <li>You now have access to all premium features</li>
                  <li>You can manage your subscription from your account dashboard</li>
                </>
              ) : (
                <>
                  <li>Your purchase is now active</li>
                  <li>You'll receive a confirmation email shortly</li>
                  <li>Your purchase has been added to your account</li>
                  <li>You can view your purchase details in your account dashboard</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link to="/dashboard" className="w-full">
            <Button className="w-full">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/" className="w-full">
            <Button variant="outline" className="w-full">Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutSuccessPage;
