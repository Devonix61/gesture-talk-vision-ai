
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { Mic, MicOff, Phone, VolumeX, Volume2 } from 'lucide-react';
import { VoiceType, speakText, speakWithEmotion, stopSpeaking } from '@/utils/speechService';

interface VoiceCallSupportProps {
  className?: string;
}

const VoiceCallSupport = ({ className }: VoiceCallSupportProps) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [voiceType, setVoiceType] = useState<VoiceType>(VoiceType.NEUTRAL);
  const [autoAnswer, setAutoAnswer] = useState(false);
  const [pitchValue, setPitchValue] = useState(1.0);
  const [rateValue, setRateValue] = useState(1.0);

  useEffect(() => {
    // Cleanup speaking when component unmounts
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleVoiceCall = () => {
    if (isCallActive) {
      endCall();
    } else {
      startCall();
    }
  };

  const startCall = () => {
    setIsCallActive(true);
    toast.success('Voice call started', {
      description: 'You can now communicate using voice synthesis',
    });
    
    // Demo greeting when call starts
    setTimeout(() => {
      speakText(
        "Hello, I'm your ISL translator assistant. I will convert your sign language to speech. How can I help you today?",
        {
          type: voiceType,
          pitch: pitchValue,
          rate: rateValue,
          volume: volume / 100
        }
      );
    }, 500);
  };

  const endCall = () => {
    setIsCallActive(false);
    stopSpeaking();
    toast.info('Voice call ended', {
      description: 'Thank you for using our voice call feature',
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    if (!isMuted) {
      stopSpeaking();
      toast.info('Microphone muted');
    } else {
      toast.info('Microphone unmuted');
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleTestVoice = () => {
    const messages = [
      "Hello, this is a test of the voice synthesis system.",
      "This is how your voice will sound during translation.",
      "You can adjust the pitch and speed to your preference."
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    speakText(
      randomMessage,
      {
        type: voiceType,
        pitch: pitchValue,
        rate: rateValue,
        volume: volume / 100
      }
    );
  };

  const handleEmotionDemo = (emotion: 'positive' | 'negative' | 'neutral') => {
    const messages = {
      positive: "I'm so excited to help you with sign language translation!",
      neutral: "This is a neutral voice sample for sign language translation.",
      negative: "I'm sorry, I couldn't understand that sign gesture correctly."
    };
    
    speakWithEmotion(
      messages[emotion],
      emotion,
      {
        type: voiceType,
        pitch: pitchValue,
        rate: rateValue,
        volume: volume / 100
      }
    );
  };

  return (
    <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      <CardHeader className="bg-gradient-to-r from-isl-primary/10 to-isl-secondary/10 rounded-t-lg">
        <CardTitle className="text-2xl">Voice Call Support</CardTitle>
        <CardDescription>Enable voice synthesis for your sign language translations</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="voice-type">Voice Type</Label>
            <Select 
              value={voiceType} 
              onValueChange={(val: VoiceType) => setVoiceType(val)}
              disabled={isCallActive}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select voice type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={VoiceType.MALE}>Male</SelectItem>
                <SelectItem value={VoiceType.FEMALE}>Female</SelectItem>
                <SelectItem value={VoiceType.NEUTRAL}>Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <Label>Voice Pitch</Label>
            <div className="flex items-center gap-4 w-72">
              <span className="text-xs text-muted-foreground">Low</span>
              <Slider 
                value={[pitchValue * 50]} 
                onValueChange={(val) => setPitchValue(val[0] / 50)} 
                max={100} 
                step={1} 
                disabled={isCallActive}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground">High</span>
            </div>
            <span className="w-12 text-right text-sm">{(pitchValue).toFixed(1)}</span>
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <Label>Speech Rate</Label>
            <div className="flex items-center gap-4 w-72">
              <span className="text-xs text-muted-foreground">Slow</span>
              <Slider 
                value={[rateValue * 50]} 
                onValueChange={(val) => setRateValue(val[0] / 50)} 
                max={100} 
                step={1} 
                disabled={isCallActive}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground">Fast</span>
            </div>
            <span className="w-12 text-right text-sm">{(rateValue).toFixed(1)}</span>
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <Label>Volume</Label>
            <div className="flex items-center gap-4 w-72">
              <VolumeX className="h-4 w-4 text-muted-foreground" />
              <Slider 
                value={[volume]} 
                onValueChange={handleVolumeChange} 
                max={100} 
                step={1} 
                className="flex-1"
              />
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="w-12 text-right text-sm">{volume}%</span>
          </div>
          
          <div className="flex items-center space-x-2 pt-4">
            <Switch 
              id="auto-answer" 
              checked={autoAnswer} 
              onCheckedChange={setAutoAnswer}
              disabled={isCallActive} 
            />
            <Label htmlFor="auto-answer">Auto-answer with voice synthesis</Label>
          </div>
        </div>
        
        <div className="pt-4 grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleEmotionDemo('positive')}
            className="text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
          >
            Test Happy Voice
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleEmotionDemo('neutral')}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          >
            Test Neutral Voice
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleEmotionDemo('negative')}
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
          >
            Test Sad Voice
          </Button>
        </div>
        
        <div className="pt-6">
          <Button 
            onClick={handleTestVoice}
            variant="outline" 
            className="w-full bg-primary/5 hover:bg-primary/10"
          >
            Test Voice Settings
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/30 flex justify-between rounded-b-lg p-6">
        <Button 
          variant={isCallActive ? "destructive" : "default"}
          className={`gap-2 ${!isCallActive && "bg-green-600 hover:bg-green-700"}`}
          onClick={handleVoiceCall}
        >
          <Phone className="h-4 w-4" />
          {isCallActive ? 'End Call' : 'Start Voice Call'}
        </Button>
        
        {isCallActive && (
          <Button 
            variant="outline" 
            className={isMuted ? "bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive" : ""}
            onClick={toggleMute}
          >
            {isMuted ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
            {isMuted ? 'Unmute' : 'Mute'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default VoiceCallSupport;
