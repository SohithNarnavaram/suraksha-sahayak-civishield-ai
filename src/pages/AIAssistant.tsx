
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Send, 
  Mic, 
  MicOff, 
  ArrowLeft, 
  Bot, 
  User, 
  Volume2,
  VolumeX,
  Globe,
  MapPin,
  Wifi,
  WifiOff
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  agent?: string;
}

const AIAssistant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [isOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = ['English', 'हिंदी (Hindi)', 'ಕನ್ನಡ (Kannada)', 'தமிழ் (Tamil)', 'తెలుగు (Telugu)'];

  // Initialize with welcome message and handle initial prompt
  useEffect(() => {
    const initialPrompt = location.state?.initialPrompt;
    
    const welcomeMessage: Message = {
      id: '1',
      type: 'bot',
      content: `🙏 Namaste! I'm CIVI-SHIELD AI Assistant. I'm here to help you with emergencies, first aid, legal rights, and safety information. I can understand and respond in multiple Indian languages. How can I assist you today?`,
      timestamp: new Date(),
      agent: 'General'
    };

    setMessages([welcomeMessage]);

    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [location.state]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectAgent = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('first aid') || lowerMessage.includes('medical') || lowerMessage.includes('bleeding') || lowerMessage.includes('emergency') || lowerMessage.includes('ambulance')) {
      return 'Medical';
    } else if (lowerMessage.includes('police') || lowerMessage.includes('rights') || lowerMessage.includes('legal') || lowerMessage.includes('arrest') || lowerMessage.includes('harassment')) {
      return 'Legal';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('helpline') || lowerMessage.includes('number') || lowerMessage.includes('call')) {
      return 'Emergency Contacts';
    } else if (lowerMessage.includes('fire') || lowerMessage.includes('flood') || lowerMessage.includes('earthquake') || lowerMessage.includes('disaster')) {
      return 'Emergency Response';
    } else if (lowerMessage.includes('fact') || lowerMessage.includes('news') || lowerMessage.includes('rumor') || lowerMessage.includes('verify')) {
      return 'Fact Check';
    }
    
    return 'General';
  };

  const generateResponse = (message: string, agent: string): string => {
    const responses = {
      'Medical': {
        'bleeding': `🩹 **For bleeding control:**
1. Apply direct pressure with clean cloth/bandage
2. Elevate the wound above heart level if possible  
3. Don't remove objects stuck in wound
4. Call 102 for ambulance immediately
5. Keep the person calm and lying down

⚠️ **Call 102 or 112 for severe bleeding!**`,
        
        'snake': `🐍 **Snake bite emergency:**
1. Keep the person calm and still
2. Remove jewelry near bite area
3. Mark swelling progression with pen
4. DON'T cut, suck, or apply ice
5. Get to hospital immediately - call 102

🏥 **India has anti-venom available at most hospitals**`,
        
        'default': `🏥 **Medical Emergency Protocol:**
- For life-threatening: Call 102 (Ambulance) or 112
- Keep patient calm and comfortable
- Don't give food/water if unconscious
- Note symptoms and time of onset
- Have ID ready for hospital

What specific medical situation are you facing?`
      },
      
      'Legal': {
        'police': `👮‍♂️ **Your Rights with Police:**
- Right to remain silent (Article 20)
- Right to know charges against you
- Right to lawyer during questioning
- Police cannot check phone without warrant
- Right to inform family of arrest

⚖️ **Remember: This is general guidance, not legal advice**`,
        
        'harassment': `🛡️ **Harassment Response:**
1. Document everything (screenshots, witnesses)
2. Report to local police station
3. Women: Call 1091 (Women Helpline)
4. Online harassment: Report to 1930 (Cyber Crime)
5. Know your rights under IPC Section 354

📞 **Immediate help: 100 (Police) or 112**`,
        
        'default': `⚖️ **Legal Rights Information:**
- Right to Fair Trial (Article 21)
- Right to Legal Representation  
- Protection from Self-Incrimination
- Right to Know Charges
- Protection from Illegal Detention

What specific legal situation do you need help with?`
      },
      
      'Emergency Contacts': {
        'default': `📞 **Emergency Numbers India:**
🚨 **112** - All Emergencies (National)
👮 **100** - Police
🚒 **101** - Fire Department  
🏥 **102** - Ambulance
👩 **1091** - Women Helpline
👶 **1098** - Child Helpline
🌊 **108** - Disaster Management

Would you like me to help you call any of these numbers?`
      },
      
      'Emergency Response': {
        'fire': `🔥 **House Fire Emergency:**
1. GET OUT immediately - don't gather belongings
2. Crawl low under smoke 
3. Feel doors before opening (hot = fire behind)
4. Call 101 (Fire) once safe outside
5. Meet at predetermined family meeting point

🚨 **Never go back inside burning building!**`,
        
        'flood': `🌊 **Flood Safety Protocol:**
1. Move to higher ground immediately
2. Avoid walking/driving through flood water
3. Call 108 (NDMA) for rescue coordination
4. Stay away from electrical equipment
5. Drink only bottled/boiled water

📱 **Monitor local admin alerts for evacuation orders**`,
        
        'default': `⚡ **General Emergency Response:**
1. Stay calm and assess the situation
2. Ensure your immediate safety first
3. Call appropriate emergency number
4. Follow instructions from authorities  
5. Have emergency kit ready

What type of emergency are you facing?`
      },
      
      'Fact Check': {
        'default': `🔍 **Fact Verification Help:**
- Cross-check with reliable sources (PIB, MyGov)
- Look for official government statements
- Avoid sharing unverified information
- Report fake news to authorities

🚫 **During emergencies, misinformation can be deadly!**

What information would you like me to help verify?`
      },
      
      'General': {
        'default': `🤖 **I can help you with:**
- 🏥 Medical emergencies & first aid
- 👮‍♂️ Legal rights & police interactions  
- 📞 Emergency contact numbers
- 🌊 Disaster response protocols
- ✅ Fact-checking information

**Quick Actions:**
- Say "medical emergency" for first aid
- Say "police rights" for legal guidance  
- Say "emergency numbers" for contacts

What do you need help with today?`
      }
    };

    const agentResponses = responses[agent as keyof typeof responses] || responses.General;
    
    // Find specific response based on keywords
    for (const [key, response] of Object.entries(agentResponses)) {
      if (key !== 'default' && message.toLowerCase().includes(key)) {
        return response;
      }
    }
    
    return agentResponses.default;
  };

  const handleSendMessage = (messageText: string = inputText) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const agent = detectAgent(messageText);
      const response = generateResponse(messageText, agent);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
        agent
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      
      // Simulate text-to-speech
      if ('speechSynthesis' in window && isSpeaking) {
        const utterance = new SpeechSynthesisUtterance(response.replace(/[🔥🩹🐍👮‍♂️🛡️📞🚨🚒🏥👩👶🌊⚡🔍🚫🤖]/g, ''));
        speechSynthesis.speak(utterance);
      }
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real implementation, this would start/stop speech recognition
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputText("I heard your voice input (demo)");
      }, 3000);
    }
  };

  const quickResponses = [
    "🐍 Snake Bite",
    "🔥 Fire Emergency", 
    "🚗 Car Accident",
    "👮‍♂️ Police Rights",
    "📞 Emergency Numbers"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold">CIVI-SHIELD AI</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <select 
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              
              <div className="flex items-center gap-1">
                {isOnline ? (
                  <Wifi className="h-4 w-4 text-green-600" />
                ) : (
                  <WifiOff className="h-4 w-4 text-orange-600" />
                )}
                <MapPin className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-blue-600' : 'bg-green-600'
                }`}>
                  {message.type === 'user' ? 
                    <User className="h-4 w-4 text-white" /> : 
                    <Bot className="h-4 w-4 text-white" />
                  }
                </div>
                
                <Card className={`${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white'}`}>
                  <CardContent className="p-4">
                    {message.agent && (
                      <Badge variant="outline" className="mb-2 text-xs">
                        {message.agent} Agent
                      </Badge>
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Responses */}
      <div className="px-4 py-2">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickResponses.map((response, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => handleSendMessage(response)}
              >
                {response}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Type your message in ${currentLanguage}...`}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-12"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={toggleListening}
              >
                {isListening ? 
                  <MicOff className="h-4 w-4 text-red-600" /> : 
                  <Mic className="h-4 w-4" />
                }
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSpeaking(!isSpeaking)}
              className={isSpeaking ? 'text-blue-600' : ''}
            >
              {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            
            <Button onClick={() => handleSendMessage()} disabled={!inputText.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
