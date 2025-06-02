
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useLocation, indianCities } from '@/contexts/LocationContext';
import { MapPin } from 'lucide-react';

const LocationSelector = () => {
  const { selectedLocation, setLocation, useCurrentLocation, isUsingCurrentLocation } = useLocation();

  return (
    <div className="flex items-center gap-2">
      <MapPin className="h-4 w-4 text-green-600" />
      <Select value={selectedLocation} onValueChange={setLocation}>
        <SelectTrigger className="w-[200px] border-green-200 focus:ring-green-500">
          <SelectValue placeholder="Select your city">
            {selectedLocation || "Select your city"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white z-50">
          {indianCities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button
        variant="outline"
        size="sm"
        onClick={useCurrentLocation}
        disabled={isUsingCurrentLocation}
        className="border-green-200 text-green-600 hover:bg-green-50"
      >
        {isUsingCurrentLocation ? 'Getting...' : 'Use My Location'}
      </Button>
    </div>
  );
};

export default LocationSelector;
