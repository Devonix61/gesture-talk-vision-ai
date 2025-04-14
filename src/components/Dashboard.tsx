
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import HandGestureRecognizer from './HandGestureRecognizer';
import ChatInterface from './ChatInterface';
import SignLanguageAvatar from './SignLanguageAvatar';
import SettingsPanel from './SettingsPanel';
import { VoiceType } from '@/utils/speechService';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('recognizer');
  
  // Settings state
  const [voiceSettings, setVoiceSettings] = useState({
    type: VoiceType.NEUTRAL,
    pitch: 1.0,
    rate: 1.0,
    volume: 1.0
  });
  
  const [gestureSettings, setGestureSettings] = useState({
    sensitivity: 0.7,
    enableFacialExpressions: true,
    enableHandGestures: true
  });
  
  const [interfaceSettings, setInterfaceSettings] = useState({
    darkMode: false,
    highContrast: false,
    fontSize: 16,
    language: 'en'
  });
  
  // Demo usage stats
  const usageStats = {
    translations: 57,
    accuracy: 84,
    conversations: 12,
    savedTranslations: 8
  };
  
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Manage your ISL translation settings and view usage statistics.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline">
              User Guide
            </Button>
            <Button>
              New Translation
            </Button>
          </div>
        </div>
        
        {/* Usage Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Translations"
            value={usageStats.translations}
            description="Sign language translations performed"
            trend="up"
            percentage={12}
            icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
          />
          
          <StatCard
            title="Accuracy"
            value={`${usageStats.accuracy}%`}
            description="Average gesture recognition accuracy"
            trend="up"
            percentage={5}
            icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
          />
          
          <StatCard
            title="Conversations"
            value={usageStats.conversations}
            description="AI-assisted conversations"
            trend="up"
            percentage={24}
            icon={<LineChart className="h-4 w-4 text-muted-foreground" />}
          />
          
          <StatCard
            title="Saved Translations"
            value={usageStats.savedTranslations}
            description="Translations saved to your account"
            trend="same"
            percentage={0}
            icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="recognizer" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-4xl mx-auto mb-8">
            <TabsTrigger value="recognizer">
              ISL Recognizer
            </TabsTrigger>
            <TabsTrigger value="avatar">
              3D Avatar
            </TabsTrigger>
            <TabsTrigger value="chat">
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="settings">
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recognizer">
            <HandGestureRecognizer />
          </TabsContent>
          
          <TabsContent value="avatar">
            <SignLanguageAvatar />
          </TabsContent>
          
          <TabsContent value="chat">
            <ChatInterface />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsPanel 
              voiceSettings={voiceSettings}
              onVoiceSettingsChange={setVoiceSettings}
              gestureSettings={gestureSettings}
              onGestureSettingsChange={setGestureSettings}
              interfaceSettings={interfaceSettings}
              onInterfaceSettingsChange={setInterfaceSettings}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  trend: 'up' | 'down' | 'same';
  percentage: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, description, trend, percentage, icon }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend !== 'same' && (
          <div className="mt-2">
            <Badge variant={trend === 'up' ? 'default' : 'destructive'} className="text-xs">
              {trend === 'up' ? '↑' : '↓'} {percentage}%
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Dashboard;
