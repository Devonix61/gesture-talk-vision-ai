
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VoiceType } from '@/utils/speechService';

interface SettingsPanelProps {
  voiceSettings: {
    type: VoiceType;
    pitch: number;
    rate: number;
    volume: number;
  };
  onVoiceSettingsChange: (settings: any) => void;
  gestureSettings: {
    sensitivity: number;
    enableFacialExpressions: boolean;
    enableHandGestures: boolean;
  };
  onGestureSettingsChange: (settings: any) => void;
  interfaceSettings: {
    darkMode: boolean;
    highContrast: boolean;
    fontSize: number;
    language: string;
  };
  onInterfaceSettingsChange: (settings: any) => void;
}

const SettingsPanel = ({
  voiceSettings,
  onVoiceSettingsChange,
  gestureSettings,
  onGestureSettingsChange,
  interfaceSettings,
  onInterfaceSettingsChange
}: SettingsPanelProps) => {
  const [activeTab, setActiveTab] = useState('voice');
  
  // Handle voice settings changes
  const handleVoiceTypeChange = (value: string) => {
    onVoiceSettingsChange({
      ...voiceSettings,
      type: value as VoiceType
    });
  };
  
  const handleVoicePitchChange = (value: number[]) => {
    onVoiceSettingsChange({
      ...voiceSettings,
      pitch: value[0]
    });
  };
  
  const handleVoiceRateChange = (value: number[]) => {
    onVoiceSettingsChange({
      ...voiceSettings,
      rate: value[0]
    });
  };
  
  const handleVoiceVolumeChange = (value: number[]) => {
    onVoiceSettingsChange({
      ...voiceSettings,
      volume: value[0]
    });
  };
  
  // Handle gesture settings changes
  const handleSensitivityChange = (value: number[]) => {
    onGestureSettingsChange({
      ...gestureSettings,
      sensitivity: value[0]
    });
  };
  
  const handleFacialExpressionsChange = (checked: boolean) => {
    onGestureSettingsChange({
      ...gestureSettings,
      enableFacialExpressions: checked
    });
  };
  
  const handleHandGesturesChange = (checked: boolean) => {
    onGestureSettingsChange({
      ...gestureSettings,
      enableHandGestures: checked
    });
  };
  
  // Handle interface settings changes
  const handleDarkModeChange = (checked: boolean) => {
    onInterfaceSettingsChange({
      ...interfaceSettings,
      darkMode: checked
    });
  };
  
  const handleHighContrastChange = (checked: boolean) => {
    onInterfaceSettingsChange({
      ...interfaceSettings,
      highContrast: checked
    });
  };
  
  const handleFontSizeChange = (value: number[]) => {
    onInterfaceSettingsChange({
      ...interfaceSettings,
      fontSize: value[0]
    });
  };
  
  const handleLanguageChange = (value: string) => {
    onInterfaceSettingsChange({
      ...interfaceSettings,
      language: value
    });
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Customize your ISL Translation system experience
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="voice" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="voice">Voice Settings</TabsTrigger>
            <TabsTrigger value="gesture">Gesture Recognition</TabsTrigger>
            <TabsTrigger value="interface">Interface</TabsTrigger>
          </TabsList>
          
          <TabsContent value="voice" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Voice Type</Label>
                <Select 
                  value={voiceSettings.type} 
                  onValueChange={handleVoiceTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={VoiceType.MALE}>Male</SelectItem>
                    <SelectItem value={VoiceType.FEMALE}>Female</SelectItem>
                    <SelectItem value={VoiceType.NEUTRAL}>Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Pitch: {voiceSettings.pitch.toFixed(1)}</Label>
                <Slider
                  value={[voiceSettings.pitch]}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  onValueChange={handleVoicePitchChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Speaking Rate: {voiceSettings.rate.toFixed(1)}</Label>
                <Slider
                  value={[voiceSettings.rate]}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  onValueChange={handleVoiceRateChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Volume: {voiceSettings.volume.toFixed(1)}</Label>
                <Slider
                  value={[voiceSettings.volume]}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  onValueChange={handleVoiceVolumeChange}
                />
              </div>
              
              <Button className="w-full">Test Voice</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="gesture" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Recognition Sensitivity: {gestureSettings.sensitivity.toFixed(1)}</Label>
                <Slider
                  value={[gestureSettings.sensitivity]}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  onValueChange={handleSensitivityChange}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-facial">Enable Facial Expressions</Label>
                <Switch
                  id="enable-facial"
                  checked={gestureSettings.enableFacialExpressions}
                  onCheckedChange={handleFacialExpressionsChange}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-hand">Enable Hand Gestures</Label>
                <Switch
                  id="enable-hand"
                  checked={gestureSettings.enableHandGestures}
                  onCheckedChange={handleHandGesturesChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Camera</Label>
                <Select defaultValue="user">
                  <SelectTrigger>
                    <SelectValue placeholder="Select camera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Front Camera</SelectItem>
                    <SelectItem value="environment">Back Camera</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full">Calibrate Camera</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="interface" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch
                  id="dark-mode"
                  checked={interfaceSettings.darkMode}
                  onCheckedChange={handleDarkModeChange}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast">High Contrast</Label>
                <Switch
                  id="high-contrast"
                  checked={interfaceSettings.highContrast}
                  onCheckedChange={handleHighContrastChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Font Size: {interfaceSettings.fontSize}</Label>
                <Slider
                  value={[interfaceSettings.fontSize]}
                  min={12}
                  max={24}
                  step={1}
                  onValueChange={handleFontSizeChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Language</Label>
                <Select 
                  value={interfaceSettings.language} 
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="mr">Marathi</SelectItem>
                    <SelectItem value="ta">Tamil</SelectItem>
                    <SelectItem value="te">Telugu</SelectItem>
                    <SelectItem value="kn">Kannada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full">Reset to Defaults</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;
