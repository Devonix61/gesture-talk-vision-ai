
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <Link to="/">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      
      <div className="mt-8 space-y-8">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        
        <p className="text-muted-foreground">
          Last updated: April 18, 2025
        </p>
        
        {privacySections.map((section) => (
          <section key={section.title} className="space-y-4">
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <p className="text-muted-foreground">{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

const privacySections = [
  {
    title: "Information Collection",
    content: "We collect information that you provide directly to us, including when you create an account, use our translation services, or contact us for support. This may include your name, email address, and sign language video recordings during translation sessions.",
  },
  {
    title: "Use of Information",
    content: "We use the collected information to provide and improve our translation services, personalize your experience, and communicate with you about our services. Your sign language recordings are processed in real-time and are not stored unless explicitly requested.",
  },
  {
    title: "Data Security",
    content: "We implement appropriate security measures to protect your personal information. This includes encryption of data in transit and at rest, secure server infrastructure, and regular security audits.",
  },
  {
    title: "Your Rights",
    content: "You have the right to access, correct, or delete your personal information. You can also opt out of certain data collection practices. Contact us to exercise these rights.",
  },
];

export default PrivacyPage;
