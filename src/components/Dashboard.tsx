
import { useState } from 'react';
import { HandMetal, MessageSquare, Settings as SettingsIcon, PieChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from './dashboard/DashboardHeader';
import UsageStats from './dashboard/UsageStats';
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
    translations: { value: 57, trend: 'up' as const, percentage: 12 },
    accuracy: { value: 84, trend: 'up' as const, percentage: 5 },
    conversations: { value: 12, trend: 'up' as const, percentage: 24 },
    savedTranslations: { value: 8, trend: 'same' as const, percentage: 0 }
  };
  
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl animate-fade-in">
      <div className="grid gap-6">
        <DashboardHeader />
        <UsageStats data={usageStats} />
        
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

export default Dashboard;
