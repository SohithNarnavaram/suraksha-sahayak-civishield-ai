
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmergencyContacts = () => {
  const navigate = useNavigate();

  const emergencyContacts = [
    { service: "All Emergencies", number: "112", color: "bg-red-600", description: "National Emergency Number" },
    { service: "Police", number: "100", color: "bg-blue-600", description: "Police Emergency" },
    { service: "Fire Department", number: "101", color: "bg-orange-600", description: "Fire Emergency" },
    { service: "Ambulance / Medical", number: "102", color: "bg-green-600", description: "Medical Emergency" },
    { service: "Women Helpline", number: "1091", color: "bg-pink-600", description: "Women in Distress" },
    { service: "Child Helpline", number: "1098", color: "bg-purple-600", description: "Child in Need" },
    { service: "Disaster Management (NDMA)", number: "108", color: "bg-yellow-600", description: "Natural Disasters" },
    { service: "Senior Citizens Helpline", number: "14567", color: "bg-teal-600", description: "Elderly Support" },
    { service: "Cyber Crime", number: "1930", color: "bg-gray-600", description: "Online Crime Reporting" },
    { service: "Railway Emergency", number: "139", color: "bg-red-800", description: "Railway Accidents" },
    { service: "Traffic Helpline", number: "103", color: "bg-sky-600", description: "Traffic Issues" }
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold text-red-800 mb-2">🚨 Emergency Contacts</h1>
          <p className="text-lg text-gray-700">Tap any number to call immediately</p>
        </div>

        {/* Emergency Notice */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="text-center">
              <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-800 mb-2">In Life-Threatening Emergency</h2>
              <p className="text-red-700 mb-4">Call 112 - National Emergency Number</p>
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-xl px-8 py-4"
                onClick={() => handleCall('112')}
              >
                <Phone className="mr-2 h-6 w-6" />
                Call 112 Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyContacts.map((contact, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => handleCall(contact.number)}
            >
              <CardHeader className={`${contact.color} text-white`}>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{contact.service}</span>
                  <Phone className="h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{contact.number}</div>
                  <p className="text-gray-600 text-sm">{contact.description}</p>
                  <Button 
                    className={`mt-4 w-full ${contact.color} hover:opacity-90`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCall(contact.number);
                    }}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call {contact.number}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Important Information</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• Keep your phone charged and accessible</li>
              <li>• Know your exact location (address/landmark)</li>
              <li>• Stay calm and speak clearly when calling</li>
              <li>• Have your identity documents ready if possible</li>
              <li>• Follow instructions from emergency responders</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyContacts;
