import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  LineChart, 
  PieChart,  
  Settings as SettingsIcon, 
  Camera, 
  MessageSquare, 
  HandMetal,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import HandGestureRecognizer from './HandGestureRecognizer';
import ChatInterface from './ChatInterface';
import SignLanguageAvatar from './SignLanguageAvatar';
import SettingsPanel from './SettingsPanel';
import { VoiceType } from '@/utils/speechService';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('recognizer');
  const navigate = useNavigate();
  
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
  
  const handleLogout = () => {
    localStorage.removeItem('isl-auth');
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  // Demo usage stats with animation delays
  const usageStats = {
    translations: { value: 57, trend: 'up', percentage: 12 },
    accuracy: { value: 84, trend: 'up', percentage: 5 },
    conversations: { value: 12, trend: 'up', percentage: 24 },
    savedTranslations: { value: 8, trend: 'same', percentage: 0 }
  };
  
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl animate-fade-in">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-isl-primary/10 to-isl-secondary/10 p-6 rounded-xl animate-slide-down [--animation-delay:200ms]">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToHome}
                className="hover:bg-background/50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors ml-auto md:ml-0"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-isl-primary to-isl-secondary bg-clip-text text-transparent">
              ISL Dashboard
            </h2>
            <p className="text-muted-foreground mt-1">
              Manage your ISL translation settings and view usage statistics.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="border-isl-primary/20 hover:bg-isl-primary/10 transition-all group"
            >
              <BarChart className="mr-2 h-4 w-4 text-isl-primary group-hover:scale-110 transition-transform" />
              Analytics
            </Button>
            <Button 
              className="bg-gradient-to-r from-isl-primary to-isl-secondary hover:opacity-90 transition-all group"
            >
              <Camera className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              New Translation
            </Button>
          </div>
        </div>
        
        {/* Usage Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Translations"
            value={usageStats.translations.value}
            description="Sign language translations performed"
            trend={usageStats.translations.trend}
            percentage={usageStats.translations.percentage}
            icon={<LineChart className="h-5 w-5 text-isl-primary" />}
            color="isl-primary"
            delay={0}
          />
          
          <StatCard
            title="Accuracy"
            value={`${usageStats.accuracy.value}%`}
            description="Average gesture recognition accuracy"
            trend={usageStats.accuracy.trend}
            percentage={usageStats.accuracy.percentage}
            icon={<PieChart className="h-5 w-5 text-isl-secondary" />}
            color="isl-secondary"
            delay={100}
          />
          
          <StatCard
            title="Conversations"
            value={usageStats.conversations.value}
            description="AI-assisted conversations"
            trend={usageStats.conversations.trend}
            percentage={usageStats.conversations.percentage}
            icon={<MessageSquare className="h-5 w-5 text-isl-accent" />}
            color="isl-accent"
            delay={200}
          />
          
          <StatCard
            title="Saved Translations"
            value={usageStats.savedTranslations.value}
            description="Translations saved to your account"
            trend={usageStats.savedTranslations.trend}
            percentage={usageStats.savedTranslations.percentage}
            icon={<BarChart className="h-5 w-5 text-muted-foreground" />}
            color="muted"
            delay={300}
          />
        </div>
        
        {/* Main Content Tabs */}
        <Tabs 
          defaultValue="recognizer" 
          onValueChange={setActiveTab} 
          value={activeTab}
          className="mt-2 animate-fade-in [--animation-delay:400ms]"
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
              <PieChart className="mr-2 h-4 w-4" />
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
          
          <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-muted animate-slide-up [--animation-delay:500ms]">
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

// Enhanced Stat Card Component with animations
interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  trend: 'up' | 'down' | 'same';
  percentage: number;
  icon: React.ReactNode;
  color: 'isl-primary' | 'isl-secondary' | 'isl-accent' | 'muted';
  delay: number;
}

const StatCard = ({ title, value, description, trend, percentage, icon, color, delay }: StatCardProps) => {
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
    <Card 
      className={`bg-gradient-to-br ${getColorClasses()} border hover:shadow-md transition-all duration-300 overflow-hidden group animate-slide-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="p-2 rounded-full bg-background/50 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold animate-count-up">
          {value}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend !== 'same' && (
          <div className="mt-2">
            <Badge 
              variant={trend === 'up' ? 'default' : 'destructive'} 
              className="text-xs animate-slide-in-right"
            >
              {trend === 'up' ? '↑' : '↓'} {percentage}%
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Dashboard;
