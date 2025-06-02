import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Wifi, 
  WifiOff,
  Bot,
  Heart,
  Shield,
  AlertTriangle,
  Flame,
  Droplets,
  Hospital,
  Users
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isOnline] = useState(navigator.onLine);

  const quickActions = [
    { 
      icon: Flame, 
      title: "Fire Emergency", 
      prompt: "What to do in a house fire?",
      color: "bg-orange-500 hover:bg-orange-600"
    },
    { 
      icon: Droplets, 
      title: "Flood Alert", 
      prompt: "I'm in a flood zone, what should I do?",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    { 
      icon: Heart, 
      title: "Medical Emergency", 
      prompt: "Someone is bleeding. What first aid can I give?",
      color: "bg-green-500 hover:bg-green-600"
    },
    { 
      icon: Shield, 
      title: "Police/Legal", 
      prompt: "I'm being harassed. What are my rights?",
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  const features = [
    {
      icon: Bot,
      title: "AI Assistant",
      description: "Multilingual voice/text chat in Indian languages",
      color: "text-blue-600"
    },
    {
      icon: MapPin,
      title: "Location-Based",
      description: "Context-aware guidance and alerts",
      color: "text-green-600"
    },
    {
      icon: isOnline ? Wifi : WifiOff,
      title: "Offline Ready",
      description: "Operates without internet access",
      color: isOnline ? "text-purple-600" : "text-orange-600"
    }
  ];

  const handleQuickAction = (prompt: string) => {
    navigate('/ai-assistant', { state: { initialPrompt: prompt } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              CIVI-SHIELD 🇮🇳
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              AI-Powered Multilingual Emergency Response System
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-3"
                onClick={() => navigate('/ai-assistant')}
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 py-3"
                onClick={() => navigate('/emergency')}
              >
                Report Emergency
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Status Bar */}
        <div className="mb-8">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isOnline ? (
                    <Wifi className="h-5 w-5 text-green-600" />
                  ) : (
                    <WifiOff className="h-5 w-5 text-orange-600" />
                  )}
                  <span className="font-medium">
                    Status: {isOnline ? 'Online' : 'Offline Mode'}
                  </span>
                </div>
                <Badge variant={isOnline ? "default" : "secondary"}>
                  {isOnline ? 'All Features Available' : 'Basic Features Only'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Quick Emergency Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handleQuickAction(action.prompt)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`${action.color} text-white p-4 rounded-full inline-flex mb-4`}>
                    <action.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.prompt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Access */}
        <div className="text-center">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-8">
              <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-red-800 mb-4">In Case of Emergency</h3>
              <p className="text-red-700 mb-6">
                For immediate assistance, access emergency contacts or chat with our AI assistant
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => navigate('/emergency')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency Contacts
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-red-600 text-red-600 hover:bg-red-50"
                  onClick={() => navigate('/ai-assistant')}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  AI Assistant
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
