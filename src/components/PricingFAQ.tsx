
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PricingFAQ = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What's the difference between subscription and one-time purchases?</AccordionTrigger>
          <AccordionContent>
            Subscriptions provide continuous access to our platform with regular updates and support for a monthly fee.
            One-time purchases give you specific features or credits that don't expire, but don't include future updates
            or ongoing premium support.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I upgrade my subscription later?</AccordionTrigger>
          <AccordionContent>
            Yes, you can upgrade your subscription at any time. When you upgrade, you'll be charged the prorated difference
            for the remainder of your billing cycle.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
          <AccordionContent>
            We offer a 14-day money-back guarantee for all subscription plans. One-time purchases are non-refundable once
            the service has been activated or downloads have begun.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger>Is there a free trial available?</AccordionTrigger>
          <AccordionContent>
            Yes, our free plan allows you to test the basic functionality of our platform. For premium features, we offer
            a 7-day trial when you sign up for a Pro or Enterprise subscription.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger>How secure is my payment information?</AccordionTrigger>
          <AccordionContent>
            We use industry-standard encryption and secure payment processors. We never store your full credit card details
            on our servers. All payment processing is handled by Stripe, a PCI-compliant payment processor.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-6">
          <AccordionTrigger>How can I cancel my subscription?</AccordionTrigger>
          <AccordionContent>
            You can cancel your subscription at any time from your account dashboard. After cancellation, you'll continue
            to have access to premium features until the end of your current billing period.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PricingFAQ;
