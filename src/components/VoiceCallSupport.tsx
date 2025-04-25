
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Phone, PhoneOff, Volume2, Settings, Wand2, Users } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const VoiceCallSupport = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [selectedVoice, setSelectedVoice] = useState("sarah");
  const [advancedSettings, setAdvancedSettings] = useState({
    noiseReduction: true,
    emotionDetection: true,
    autoTranslate: false,
    accentStrength: [50]
  });
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');

  const handleStartCall = () => {
    if (!isActive) {
      setCallStatus('connecting');
      toast.info("Initializing voice engine...");
      
      // Simulate connection delay
      setTimeout(() => {
        setIsActive(true);
        setCallStatus('active');
        toast.success("Voice call system activated");
      }, 1500);
    } else {
      setIsActive(false);
      setCallStatus('ended');
      toast.info("Voice call system deactivated");
      
      // Reset to idle after showing ended state
      setTimeout(() => {
        setCallStatus('idle');
      }, 2000);
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? "Microphone activated" : "Microphone muted");
  };

  const handleVoiceChange = (value: string) => {
    setSelectedVoice(value);
    toast.success(`Voice changed to ${getVoiceName(value)}`);
  };

  const toggleAdvancedSetting = (setting: keyof typeof advancedSettings) => {
    if (typeof advancedSettings[setting] === 'boolean') {
      setAdvancedSettings({
        ...advancedSettings,
        [setting]: !advancedSettings[setting]
      });
      
      toast.info(`${setting.charAt(0).toUpperCase() + setting.slice(1).replace(/([A-Z])/g, ' $1')} ${advancedSettings[setting] ? 'disabled' : 'enabled'}`);
    }
  };

  const getVoiceName = (id: string): string => {
    const voices = {
      "sarah": "Sarah (Default)",
      "roger": "Roger (Male)",
      "aria": "Aria (Female)",
      "charlie": "Charlie (Neutral)",
      "custom": "Custom Voice"
    };
    return voices[id as keyof typeof voices] || id;
  };

  const getCallStatusClass = () => {
    switch (callStatus) {
      case 'connecting': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/40';
      case 'active': return 'bg-green-500/20 text-green-500 border-green-500/40 animate-pulse';
      case 'ended': return 'bg-red-500/20 text-red-500 border-red-500/40';
      default: return 'bg-muted/30 text-muted-foreground border-muted/40';
    }
  };

  const getCallStatusText = () => {
    switch (callStatus) {
      case 'connecting': return 'Connecting...';
      case 'active': return 'Call Active';
      case 'ended': return 'Call Ended';
      default: return 'Voice Call Ready';
    }
  };

  return (
    <div className="bg-card/80 border border-border rounded-xl p-6 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold flex items-center">
              <Phone className="mr-2 h-5 w-5 text-primary" />
              Voice Call Support
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Translate ISL to voice during phone calls in real-time
            </p>
          </div>
          
          <Badge 
            variant="outline" 
            className={`px-3 py-1 transition-colors duration-300 ${getCallStatusClass()}`}
          >
            {getCallStatusText()}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main controls */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Voice Selection</Label>
              <Select value={selectedVoice} onValueChange={handleVoiceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah (Default)</SelectItem>
                  <SelectItem value="roger">Roger (Male)</SelectItem>
                  <SelectItem value="aria">Aria (Female)</SelectItem>
                  <SelectItem value="charlie">Charlie (Neutral)</SelectItem>
                  <SelectItem value="custom">Custom Voice</SelectItem>
                </SelectContent>
              </Select>
              
              {selectedVoice === 'custom' && (
                <div className="p-3 bg-muted/30 rounded-md mt-2">
                  <p className="text-xs text-muted-foreground">
                    Custom voice requires voice sample recording. Visit dashboard to set up.
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Volume</Label>
                <span className="text-sm text-muted-foreground">{volume[0]}%</span>
              </div>
              <div className="flex items-center space-x-3">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={volume}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={setVolume}
                  className="flex-1"
                  disabled={!isActive}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="font-medium">Advanced Settings</Label>
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wand2 className="h-4 w-4 text-primary" />
                    <Label>Noise Reduction</Label>
                  </div>
                  <Switch 
                    checked={advancedSettings.noiseReduction}
                    onCheckedChange={() => toggleAdvancedSetting('noiseReduction')}
                    disabled={!isActive}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wand2 className="h-4 w-4 text-primary" />
                    <Label>Emotion Detection</Label>
                  </div>
                  <Switch 
                    checked={advancedSettings.emotionDetection}
                    onCheckedChange={() => toggleAdvancedSetting('emotionDetection')}
                    disabled={!isActive}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-primary" />
                    <Label>Auto-translate Incoming</Label>
                  </div>
                  <Switch 
                    checked={advancedSettings.autoTranslate}
                    onCheckedChange={() => toggleAdvancedSetting('autoTranslate')}
                    disabled={!isActive}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Accent Strength</Label>
                  <span className="text-sm text-muted-foreground">{advancedSettings.accentStrength[0]}%</span>
                </div>
                <Slider
                  value={advancedSettings.accentStrength}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => setAdvancedSettings({...advancedSettings, accentStrength: value})}
                  disabled={!isActive}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          {/* Call visualization / status */}
          <div className="flex flex-col items-center justify-between h-full bg-muted/20 p-5 rounded-xl border border-border/50">
            <div className="w-full flex-1 flex items-center justify-center">
              <div className="relative">
                <div className={`w-32 h-32 rounded-full ${isActive ? 'bg-primary/10' : 'bg-muted/30'} flex items-center justify-center`}>
                  <div className={`absolute w-32 h-32 rounded-full ${isActive ? 'bg-primary/5' : 'bg-transparent'} animate-ping-slow opacity-70`}></div>
                  <div className={`absolute w-48 h-48 rounded-full ${isActive ? 'bg-primary/3' : 'bg-transparent'} animate-ping-slow opacity-30 animation-delay-300`}></div>
                  <div className={`absolute w-64 h-64 rounded-full ${isActive ? 'bg-primary/1' : 'bg-transparent'} animate-ping-slow opacity-10 animation-delay-600`}></div>
                  
                  <div className="text-4xl font-bold text-primary/80">
                    {isActive ? (isMuted ? <MicOff /> : <Mic className="animate-pulse" />) : <Phone />}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col w-full space-y-4 mt-6">
              {isActive && (
                <Button 
                  variant={isMuted ? "default" : "outline"}
                  className={`w-full ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'border-primary/30 hover:bg-primary/10'}`}
                  onClick={handleMute}
                >
                  {isMuted ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
                  {isMuted ? 'Unmute' : 'Mute'}
                </Button>
              )}
              
              <Button 
                className={`w-full ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
                onClick={handleStartCall}
              >
                {isActive ? <PhoneOff className="mr-2 h-4 w-4" /> : <Phone className="mr-2 h-4 w-4" />}
                {isActive ? 'End Call' : 'Start Call'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Feature highlight at the bottom */}
        <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg mt-2">
          <p className="text-sm text-center">
            <strong>New!</strong> Our voice call system now supports emotion detection and can match 
            your signing emotion with appropriate voice inflection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceCallSupport;
