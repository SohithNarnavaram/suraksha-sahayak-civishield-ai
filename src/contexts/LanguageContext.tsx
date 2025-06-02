import React, { createContext, useContext, useState } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' }
];

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<string, string>> = {
  en: {
    appName: "Suraksha Sahayak AI",
    title: "Suraksha Sahayak AI 🇮🇳",
    subtitle: "India's Voice-First Emergency Assistant",
    getStarted: "Get Started",
    reportEmergency: "Report Emergency",
    quickEmergencyActions: "Quick Emergency Actions",
    keyFeatures: "Key Features",
    fireEmergency: "Fire Emergency",
    firePrompt: "What to do in a house fire?",
    floodAlert: "Flood Alert", 
    floodPrompt: "I'm in a flood zone, what should I do?",
    medicalEmergency: "Medical Emergency",
    medicalPrompt: "Someone is bleeding. What first aid can I give?",
    policeLegal: "Police/Legal",
    policePrompt: "I'm being harassed. What are my rights?",
    aiAssistant: "AI Assistant",
    aiDescription: "Multilingual voice/text chat in Indian languages",
    locationBased: "Location-Based",
    locationDescription: "Context-aware guidance and alerts",
    offlineReady: "Offline Ready", 
    offlineDescription: "Operates without internet access",
    emergencyCase: "In Case of Emergency",
    emergencyDescription: "For immediate assistance, access emergency contacts or chat with our AI assistant",
    emergencyContacts: "Emergency Contacts",
    status: "Status",
    online: "Online",
    offlineMode: "Offline Mode",
    allFeaturesAvailable: "All Features Available",
    basicFeaturesOnly: "Basic Features Only"
  },
  hi: {
    appName: "सुरक्षा सहायक AI",
    title: "सुरक्षा सहायक AI 🇮🇳", 
    subtitle: "भारत का वॉयस-फर्स्ट आपातकालीन सहायक",
    getStarted: "शुरू करें",
    reportEmergency: "आपातकाल की रिपोर्ट करें",
    quickEmergencyActions: "त्वरित आपातकालीन कार्य",
    keyFeatures: "मुख्य विशेषताएं",
    fireEmergency: "आग की आपातकाल",
    firePrompt: "घर में आग लगने पर क्या करें?",
    floodAlert: "बाढ़ चेतावनी",
    floodPrompt: "मैं बाढ़ क्षेत्र में हूँ, मुझे क्या करना चाहिए?",
    medicalEmergency: "चिकित्सा आपातकाल",
    medicalPrompt: "किसी से खून बह रहा है। मैं क्या प्राथमिक चिकित्सा दे सकता हूँ?",
    policeLegal: "पुलिस/कानूनी",
    policePrompt: "मुझे परेशान किया जा रहा है। मेरे क्या अधिकार हैं?",
    aiAssistant: "एआई सहायक",
    aiDescription: "भारतीय भाषाओं में बहुभाषी वॉयस/टेक्स्ट चैट",
    locationBased: "स्थान-आधारित",
    locationDescription: "संदर्भ-जागरूक मार्गदर्शन और अलर्ट",
    offlineReady: "ऑफलाइन तैयार",
    offlineDescription: "इंटरनेट एक्सेस के बिना काम करता है",
    emergencyCase: "आपातकाल के मामले में",
    emergencyDescription: "तत्काल सहायता के लिए, आपातकालीन संपर्क तक पहुंचें या हमारे एआई सहायक से चैट करें",
    emergencyContacts: "आपातकालीन संपर्क",
    status: "स्थिति",
    online: "ऑनलाइन",
    offlineMode: "ऑफलाइन मोड",
    allFeaturesAvailable: "सभी सुविधाएं उपलब्ध",
    basicFeaturesOnly: "केवल बुनियादी सुविधाएं"
  },
  ta: {
    appName: "சுரக்ஷா சஹாயக் AI",
    title: "சுரக்ஷா சஹாயக் AI 🇮🇳",
    subtitle: "இந்தியாவின் குரல்-முதல் அவசர உதவியாளர்",
    getStarted: "தொடங்குங்கள்",
    reportEmergency: "அவசரநிலையை அறிக்கை செய்யுங்கள்",
    quickEmergencyActions: "விரைவு அவசர நடவடிக்கைகள்",
    keyFeatures: "முக்கிய அம்சங்கள்",
    fireEmergency: "தீ அவசரநிலை",
    firePrompt: "வீட்டில் தீ பிடித்தால் என்ன செய்வது?",
    floodAlert: "வெள்ள எச்சரிக்கை",
    floodPrompt: "நான் வெள்ள பகுதியில் இருக்கிறேன், நான் என்ன செய்ய வேண்டும்?",
    medicalEmergency: "மருத்துவ அவசரநிலை",
    medicalPrompt: "யாரோ ரத்தம் வருகிறது. நான் என்ன முதலுதவி கொடுக்க முடியும்?",
    policeLegal: "காவல்துறை/சட்ட",
    policePrompt: "நான் தொந்தரவு செய்யப்படுகிறேன். என் உரிமைகள் என்ன?",
    aiAssistant: "AI உதவியாளர்",
    aiDescription: "இந்திய மொழிகளில் பலமொழி குரல்/உரை அரட்டை",
    locationBased: "இடம்-அடிப்படையிலான",
    locationDescription: "சூழல்-உணர்வு வழிகாட்டுதல் மற்றும் எச்சரிக்கைகள்",
    offlineReady: "ஆஃப்லைன் தயார்",
    offlineDescription: "இணைய அணுகல் இல்லாமல் இயங்குகிறது",
    emergencyCase: "அவசரநிலையில்",
    emergencyDescription: "உடனடி உதவிக்காக, அவசர தொடர்புகளை அணுகவும் அல்லது எங்கள் AI உதவியாளருடன் அரட்டையடிக்கவும்",
    emergencyContacts: "அவசர தொடர்புகள்",
    status: "நிலை",
    online: "ஆன்லைன்",
    offlineMode: "ஆஃப்லைன் முறை",
    allFeaturesAvailable: "அனைத்து அம்சங்களும் கிடைக்கின்றன",
    basicFeaturesOnly: "அடிப்படை அம்சங்கள் மட்டும்"
  },
  te: {
    appName: "సురక్ష సహాయక్ AI", 
    title: "సురక్ష సహాయక్ AI 🇮🇳",
    subtitle: "భారతదేశ వాయిస్-ఫస్ట్ అత్యవసర సహాయకుడు",
    getStarted: "ప్రారంభించండి",
    reportEmergency: "అత్యవసరతను నివేదించండి",
    quickEmergencyActions: "త్వరిత అత్యవసర చర్యలు",
    keyFeatures: "ప్రధాన లక్షణాలు",
    fireEmergency: "అగ్ని అత్యవసరత",
    firePrompt: "ఇంటిలో మంట పట్టినప్పుడు ఏమి చేయాలి?",
    floodAlert: "వరద హెచ్చరిక",
    floodPrompt: "నేను వరద ప్రాంతంలో ఉన్నాను, నేను ఏమి చేయాలి?",
    medicalEmergency: "వైద్య అత్యవసరత",
    medicalPrompt: "ఎవరికైనా రక్తం కారుతోంది. నేను ఏ ప్రాథమిక చికిత్స ఇవ్వగలను?",
    policeLegal: "పోలీసు/చట్టపరమైన",
    policePrompt: "నేను వేధింపులకు గురవుతున్నాను. నా హక్కులు ఏమిటి?",
    aiAssistant: "AI సహాయకుడు",
    aiDescription: "భారతీయ భాషలలో బహుభాషా వాయిస్/టెక్స్ట్ చాట్",
    locationBased: "స్థానం-ఆధారిత",
    locationDescription: "సందర్భ-అవగాహన మార్గదర్శకత్వం మరియు హెచ్చరికలు",
    offlineReady: "ఆఫ్‌లైన్ సిద్ధం",
    offlineDescription: "ఇంటర్నెట్ యాక్సెస్ లేకుండా పనిచేస్తుంది",
    emergencyCase: "అత్యవసర పరిస్థితిలో",
    emergencyDescription: "తక్షణ సహాయం కోసం, అత్యవసర పరిచయాలను యాక్సెస్ చేయండి లేదా మా AI సహాయకుడితో చాట్ చేయండి",
    emergencyContacts: "అత్యవసర పరిచయాలు",
    status: "స్థితి",
    online: "ఆన్‌లైన్",
    offlineMode: "ఆఫ్‌లైన్ మోడ్",
    allFeaturesAvailable: "అన్ని లక్షణాలు అందుబాటులో",
    basicFeaturesOnly: "ప్రాథమిక లక్షణాలు మాత్రమే"
  },
  kn: {
    appName: "ಸುರಕ್ಷಾ ಸಹಾಯಕ AI",
    title: "ಸುರಕ್ಷಾ ಸಹಾಯಕ AI 🇮🇳", 
    subtitle: "ಭಾರತದ ವಾಯ್ಸ್-ಫಸ್ಟ್ ತುರ್ತು ಸಹಾಯಕ",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    reportEmergency: "ತುರ್ತುಸ್ಥಿತಿಯನ್ನು ವರದಿ ಮಾಡಿ",
    quickEmergencyActions: "ತ್ವರಿತ ತುರ್ತು ಕ್ರಮಗಳು",
    keyFeatures: "ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು",
    fireEmergency: "ಬೆಂಕಿ ತುರ್ತುಸ್ಥಿತಿ",
    firePrompt: "ಮನೆಯಲ್ಲಿ ಬೆಂಕಿ ಹತ್ತಿದಾಗ ಏನು ಮಾಡಬೇಕು?",
    floodAlert: "ಪ್ರವಾಹ ಎಚ್ಚರಿಕೆ",
    floodPrompt: "ನಾನು ಪ್ರವಾಹ ಪ್ರದೇಶದಲ್ಲಿದ್ದೇನೆ, ನಾನು ಏನು ಮಾಡಬೇಕು?",
    medicalEmergency: "ವೈದ್ಯಕೀಯ ತುರ್ತುಸ್ಥಿತಿ",
    medicalPrompt: "ಯಾರಿಗಾದರೂ ರಕ್ತ ಬರುತ್ತಿದೆ. ನಾನು ಯಾವ ಪ್ರಾಥಮಿಕ ಚಿಕಿತ್ಸೆ ನೀಡಬಹುದು?",
    policeLegal: "ಪೊಲೀಸ್/ಕಾನೂನು",
    policePrompt: "ನಾನು ಕಿರುಕುಳಕ್ಕೆ ಒಳಗಾಗುತ್ತಿದ್ದೇನೆ. ನನ್ನ ಹಕ್ಕುಗಳು ಯಾವುವು?",
    aiAssistant: "AI ಸಹಾಯಕ",
    aiDescription: "ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಬಹುಭಾಷಾ ಧ್ವನಿ/ಪಠ್ಯ ಚಾಟ್",
    locationBased: "ಸ್ಥಳ-ಆಧಾರಿತ",
    locationDescription: "ಸಂದರ್ಭ-ಅರಿವಿನ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳು",
    offlineReady: "ಆಫ್‌ಲೈನ್ ಸಿದ್ಧ",
    offlineDescription: "ಇಂಟರ್ನೆಟ್ ಪ್ರವೇಶವಿಲ್ಲದೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
    emergencyCase: "ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ",
    emergencyDescription: "ತಕ್ಷಣದ ಸಹಾಯಕ್ಕಾಗಿ, ತುರ್ತು ಸಂಪರ್ಕಗಳನ್ನು ಪ್ರವೇಶಿಸಿ ಅಥವಾ ನಮ್ಮ AI ಸಹಾಯಕರೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ",
    emergencyContacts: "ತುರ್ತು ಸಂಪರ್ಕಗಳು",
    status: "ಸ್ಥಿತಿ",
    online: "ಆನ್‌ಲೈನ್",
    offlineMode: "ಆಫ್‌ಲೈನ್ ಮೋಡ್",
    allFeaturesAvailable: "ಎಲ್ಲಾ ವೈಶಿಷ್ಟ್ಯಗಳು ಲಭ್ಯವಿವೆ",
    basicFeaturesOnly: "ಮೂಲಭೂತ ವೈಶಿಷ್ಟ್ಯಗಳು ಮಾತ್ರ"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
