
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languages, useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-green-600" />
      <Select value={currentLanguage} onValueChange={setLanguage}>
        <SelectTrigger className="w-[140px] border-green-200 focus:ring-green-500">
          <SelectValue>
            {currentLang?.nativeName}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <div className="flex flex-col items-start">
                <span className="font-medium">{language.nativeName}</span>
                <span className="text-xs text-gray-500">{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
