
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, PieChart, Calendar, Layers, Settings as SettingsIcon, Camera, MessageSquare, HandMetal } from 'lucide-react';
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-isl-primary/10 to-isl-secondary/10 p-6 rounded-xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-isl-primary to-isl-secondary bg-clip-text text-transparent">
              ISL Dashboard
            </h2>
            <p className="text-muted-foreground mt-1">
              Manage your ISL translation settings and view usage statistics.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="border-isl-primary/20 hover:bg-isl-primary/10 transition-all">
              <Calendar className="mr-2 h-4 w-4 text-isl-primary" />
              User Guide
            </Button>
            <Button className="bg-gradient-to-r from-isl-primary to-isl-secondary hover:opacity-90 transition-all">
              <Camera className="mr-2 h-4 w-4" />
              New Translation
            </Button>
          </div>
        </div>
        
        {/* Usage Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Translations"
            value={usageStats.translations}
            description="Sign language translations performed"
            trend="up"
            percentage={12}
            icon={<Layers className="h-5 w-5 text-isl-primary" />}
            color="isl-primary"
          />
          
          <StatCard
            title="Accuracy"
            value={`${usageStats.accuracy}%`}
            description="Average gesture recognition accuracy"
            trend="up"
            percentage={5}
            icon={<PieChart className="h-5 w-5 text-isl-secondary" />}
            color="isl-secondary"
          />
          
          <StatCard
            title="Conversations"
            value={usageStats.conversations}
            description="AI-assisted conversations"
            trend="up"
            percentage={24}
            icon={<MessageSquare className="h-5 w-5 text-isl-accent" />}
            color="isl-accent"
          />
          
          <StatCard
            title="Saved Translations"
            value={usageStats.savedTranslations}
            description="Translations saved to your account"
            trend="same"
            percentage={0}
            icon={<BarChart className="h-5 w-5 text-muted-foreground" />}
            color="muted"
          />
        </div>
        
        {/* Main Content Tabs */}
        <Tabs 
          defaultValue="recognizer" 
          onValueChange={setActiveTab} 
          value={activeTab}
          className="mt-2"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-4xl mx-auto mb-8 bg-muted/50 p-1">
            <TabsTrigger 
              value="recognizer" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-isl-primary/80 data-[state=active]:to-isl-accent/80 data-[state=active]:text-white transition-all"
            >
              <HandMetal className="mr-2 h-4 w-4" />
              ISL Recognizer
            </TabsTrigger>
            <TabsTrigger 
              value="avatar"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-isl-primary/80 data-[state=active]:to-isl-accent/80 data-[state=active]:text-white transition-all"
            >
              <Layers className="mr-2 h-4 w-4" />
              3D Avatar
            </TabsTrigger>
            <TabsTrigger 
              value="chat"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-isl-primary/80 data-[state=active]:to-isl-accent/80 data-[state=active]:text-white transition-all"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-isl-primary/80 data-[state=active]:to-isl-accent/80 data-[state=active]:text-white transition-all"
            >
              <SettingsIcon className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-muted">
            <TabsContent value="recognizer" className="mt-0">
              <HandGestureRecognizer />
            </TabsContent>
            
            <TabsContent value="avatar" className="mt-0">
              <SignLanguageAvatar />
            </TabsContent>
            
            <TabsContent value="chat" className="mt-0">
              <ChatInterface />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <SettingsPanel 
                voiceSettings={voiceSettings}
                onVoiceSettingsChange={setVoiceSettings}
                gestureSettings={gestureSettings}
                onGestureSettingsChange={setGestureSettings}
                interfaceSettings={interfaceSettings}
                onInterfaceSettingsChange={setInterfaceSettings}
              />
            </TabsContent>
          </div>
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
  color: 'isl-primary' | 'isl-secondary' | 'isl-accent' | 'muted';
}

const StatCard = ({ title, value, description, trend, percentage, icon, color }: StatCardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case 'isl-primary':
        return 'from-isl-primary/20 to-isl-primary/5 border-isl-primary/20';
      case 'isl-secondary':
        return 'from-isl-secondary/20 to-isl-secondary/5 border-isl-secondary/20';
      case 'isl-accent':
        return 'from-isl-accent/20 to-isl-accent/5 border-isl-accent/20';
      default:
        return 'from-muted/20 to-muted/5 border-muted/20';
    }
  };

  return (
    <Card className={`bg-gradient-to-br ${getColorClasses()} border hover:shadow-md transition-all duration-300 overflow-hidden group`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="p-2 rounded-full bg-background/50 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
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
