
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LocationContextType {
  selectedLocation: string;
  setLocation: (location: string) => void;
  useCurrentLocation: () => Promise<void>;
  isUsingCurrentLocation: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Sample Indian cities data (in real app, this would come from an API)
export const indianCities = [
  "Mumbai, Maharashtra",
  "Delhi, NCT",
  "Bangalore, Karnataka",
  "Chennai, Tamil Nadu",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Kolkata, West Bengal",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Kochi, Kerala",
  "Coimbatore, Tamil Nadu",
  "Mysore, Karnataka",
  "Thiruvananthapuram, Kerala",
  "Vijayawada, Andhra Pradesh"
];

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);

  const setLocation = (location: string) => {
    setSelectedLocation(location);
    setIsUsingCurrentLocation(false);
  };

  const useCurrentLocation = async () => {
    try {
      setIsUsingCurrentLocation(true);
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      // In a real app, you'd use reverse geocoding API
      setSelectedLocation(`Current Location (${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)})`);
    } catch (error) {
      console.error('Location access denied:', error);
      setIsUsingCurrentLocation(false);
    }
  };

  return (
    <LocationContext.Provider value={{ 
      selectedLocation, 
      setLocation, 
      useCurrentLocation, 
      isUsingCurrentLocation 
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
