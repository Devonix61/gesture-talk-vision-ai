
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Mic, MicOff, Camera, Languages, Wand2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  fromLanguage?: string;
  translatedText?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hello! I\'m your ISL AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Send message
  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate AI thinking
    setIsGenerating(true);
    
    // Simulate response delay
    setTimeout(() => {
      // Generate response
      generateResponse(userMessage.text);
    }, 1000);
  };
  
  // Generate AI response
  const generateResponse = (userText: string) => {
    // Simple responses for demo purposes
    const responses = [
      "I understand you're looking for help with ISL translation. Our system can help you with that.",
      "Thank you for your message. I can assist with converting your sign language to text and speech.",
      "Would you like me to explain how the ISL translation works?",
      "I can help you communicate more effectively using our AI translation technology.",
      "Is there a specific feature of the ISL translator you'd like to learn more about?",
      "I'm analyzing your request and will provide the best assistance for your ISL translation needs."
    ];
    
    // Select a random response
    const responseText = responses[Math.floor(Math.random() * responses.length)];
    
    // Create assistant message
    const assistantMessage: Message = {
      id: Date.now().toString(),
      sender: 'assistant',
      text: responseText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsGenerating(false);
    
    // Show toast notification
    toast.success('Response generated successfully');
  };
  
  // Handle speech recognition
  const toggleListening = () => {
    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }
    
    // Start listening
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        toast.error('Speech recognition is not supported in your browser');
        return;
      }
      
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        toast.error('Error in speech recognition');
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.start();
      setIsListening(true);
      toast.info('Listening...');
    } catch (error) {
      console.error('Speech recognition error:', error);
      toast.error('Could not start speech recognition');
    }
  };
  
  // Handle input submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto flex flex-col h-[600px]">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-lg font-medium flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="/placeholder.svg" alt="AI" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          ISL AI Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 flex-grow overflow-hidden">
        <ScrollArea className="h-full px-4 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'assistant'
                      ? 'bg-muted'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <div className="mb-1">
                    {message.sender === 'assistant' && (
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src="/placeholder.svg" alt="AI" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">Assistant</span>
                      </div>
                    )}
                  </div>
                  <p>{message.text}</p>
                  {message.translatedText && (
                    <div className="mt-2 pt-2 border-t border-border/50 text-sm text-muted-foreground">
                      <p className="italic">{message.translatedText}</p>
                      <div className="flex items-center text-xs mt-1">
                        <Languages className="h-3 w-3 mr-1" />
                        <span>Translated from {message.fromLanguage}</span>
                      </div>
                    </div>
                  )}
                  <div className="text-xs opacity-70 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-3 bg-muted flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="p-4 border-t">
        <div className="flex w-full items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleListening}
            className={isListening ? 'bg-red-500 text-white hover:bg-red-600' : ''}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
          >
            <Camera className="h-5 w-5" />
          </Button>
          
          <Input
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow"
          />
          
          <Button
            variant="outline"
            size="icon"
            className="text-primary"
          >
            <Wand2 className="h-5 w-5" />
          </Button>
          
          <Button
            type="submit"
            size="icon"
            onClick={sendMessage}
            disabled={!inputText.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
