
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, AlertTriangle, Flame, AlertOctagon } from 'lucide-react';

const EmergencyHeadlines = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const headlines = [
    {
      icon: AlertTriangle,
      text: "⚠️ Red alert in Assam due to heavy rainfall – NDMA",
      severity: "high"
    },
    {
      icon: Flame,
      text: "🔥 Fire incident reported in Chennai market, no casualties",
      severity: "medium"
    },
    {
      icon: AlertOctagon,
      text: "🚧 Section 144 imposed in Old Delhi till 6 PM today",
      severity: "medium"
    },
    {
      icon: AlertTriangle,
      text: "🦠 Heat wave warning issued for Rajasthan and Gujarat",
      severity: "high"
    },
    {
      icon: AlertOctagon,
      text: "📢 Traffic advisory: Major roads closed due to VIP movement in Mumbai",
      severity: "low"
    }
  ];

  const visibleHeadlines = isExpanded ? headlines : headlines.slice(0, 3);

  return (
    <div className="mb-6">
      <Card className="bg-gradient-to-r from-yellow-50 to-blue-50 border-yellow-300 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              📰 Today's Emergency Headlines
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-600 hover:text-gray-800"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show More
                </>
              )}
            </Button>
          </div>
          
          <div className="space-y-2">
            {visibleHeadlines.map((headline, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  headline.severity === 'high' 
                    ? 'bg-red-50 border-l-red-500 text-red-800' 
                    : headline.severity === 'medium'
                    ? 'bg-orange-50 border-l-orange-500 text-orange-800'
                    : 'bg-blue-50 border-l-blue-500 text-blue-800'
                } transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <headline.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p className="font-medium text-sm leading-relaxed">
                    {headline.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile carousel indicator */}
          <div className="flex justify-center mt-3 md:hidden">
            <div className="flex gap-1">
              {headlines.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index < visibleHeadlines.length ? 'bg-gray-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyHeadlines;
