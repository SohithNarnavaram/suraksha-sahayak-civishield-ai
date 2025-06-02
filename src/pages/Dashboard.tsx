import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from '@/contexts/LocationContext';
import LanguageSelector from '@/components/LanguageSelector';
import LocationSelector from '@/components/LocationSelector';
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
  Sparkles,
  Zap,
  Siren
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isOnline] = useState(navigator.onLine);
  const { t } = useLanguage();
  const { selectedLocation } = useLocation();

  const quickActions = [
    { 
      icon: Flame, 
      title: t('fireEmergency'), 
      prompt: t('firePrompt'),
      color: "bg-orange-500 hover:bg-orange-600"
    },
    { 
      icon: Droplets, 
      title: t('floodAlert'), 
      prompt: t('floodPrompt'),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    { 
      icon: Heart, 
      title: t('medicalEmergency'), 
      prompt: t('medicalPrompt'),
      color: "bg-red-500 hover:bg-red-600"
    },
    { 
      icon: Shield, 
      title: t('policeLegal'), 
      prompt: t('policePrompt'),
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  const features = [
    {
      icon: Bot,
      title: t('aiAssistant'),
      description: t('aiDescription'),
      color: "text-green-600"
    },
    {
      icon: MapPin,
      title: t('locationBased'),
      description: t('locationDescription'),
      color: "text-green-600"
    },
    {
      icon: isOnline ? Wifi : WifiOff,
      title: t('offlineReady'),
      description: t('offlineDescription'),
      color: isOnline ? "text-green-600" : "text-orange-600"
    }
  ];

  const handleQuickAction = (prompt: string) => {
    navigate('/ai-assistant', { state: { initialPrompt: prompt } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
              <LanguageSelector />
              <LocationSelector />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {t('subtitle')}
            </p>
            {selectedLocation && (
              <div className="flex items-center justify-center gap-2 mb-6 bg-white bg-opacity-20 rounded-lg px-4 py-2 inline-flex">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Location: {selectedLocation}</span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3 shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/ai-assistant')}
              >
                <Bot className="mr-2 h-5 w-5" />
                {t('getStarted')}
              </Button>
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3 shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/emergency')}
              >
                <Siren className="mr-2 h-5 w-5" />
                {t('reportEmergency')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Status Bar */}
        <div className="mb-8">
          <Card className="border-l-4 border-l-green-500 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isOnline ? (
                    <Wifi className="h-5 w-5 text-green-600" />
                  ) : (
                    <WifiOff className="h-5 w-5 text-orange-600" />
                  )}
                  <span className="font-medium">
                    {t('status')}: {isOnline ? t('online') : t('offlineMode')}
                  </span>
                </div>
                <Badge variant={isOnline ? "default" : "secondary"} className="bg-green-100 text-green-800">
                  {isOnline ? t('allFeaturesAvailable') : t('basicFeaturesOnly')}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prominent AI Chatbot Feature */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 p-6 rounded-full animate-pulse">
                  <Bot className="h-20 w-20" />
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <Sparkles className="h-10 w-10" />
                🎙️ Voice-Enabled {t('aiAssistant')}
                <Sparkles className="h-10 w-10" />
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Speak or type in Hindi, Tamil, Telugu, Kannada, or English
              </p>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-6">
                <p className="text-lg font-medium">
                  "मुझे मदद चाहिए" • "எனக்கு உதவி வேண்டும்" • "నాకు సహాయం కావాలి"
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100 text-xl px-10 py-5 shadow-lg transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate('/ai-assistant')}
                >
                  <MessageSquare className="mr-3 h-7 w-7" />
                  Start Voice Chat
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-green-600 text-xl px-10 py-5 transition-all duration-300"
                  onClick={() => navigate('/ai-assistant', { state: { voiceMode: true } })}
                >
                  <Zap className="mr-3 h-7 w-7" />
                  Quick Voice Help
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-800">{t('quickEmergencyActions')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border-green-200 hover:border-green-400"
                onClick={() => handleQuickAction(action.prompt)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`${action.color} text-white p-4 rounded-full inline-flex mb-4 transition-all duration-300 hover:scale-110`}>
                    <action.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-green-800">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.prompt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-800">{t('keyFeatures')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-green-200 hover:border-green-400">
                <CardHeader>
                  <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                  <CardTitle className="text-xl text-green-800">{feature.title}</CardTitle>
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
          <Card className="bg-green-50 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <AlertTriangle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-800 mb-4">{t('emergencyCase')}</h3>
              <p className="text-green-700 mb-6">
                {t('emergencyDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 shadow-lg transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate('/emergency')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t('emergencyContacts')}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-50 transition-all duration-300"
                  onClick={() => navigate('/ai-assistant')}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {t('aiAssistant')}
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
