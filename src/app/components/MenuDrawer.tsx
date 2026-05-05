import { Info, Map, Navigation, X, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { getTranslation, Language } from '../utils/translations';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'lv';
  onLanguageChange: (lang: 'en' | 'lv') => void;
}

export function MenuDrawer({ isOpen, onClose, language, onLanguageChange }: MenuDrawerProps) {
  if (!isOpen) return null;

  const t = (key: keyof typeof import('../utils/translations').translations.en) =>
    getTranslation(language, key);

  return (
    <div className="absolute inset-0 z-40 animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="absolute top-20 right-4 bg-white rounded-2xl shadow-2xl w-72 border-2 border-gray-200 animate-in slide-in-from-top duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-xl">{t('menu')}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-[#FCE8E9] rounded-lg">
              <div className="bg-[#A82227] p-2 rounded-full">
                <Map className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">{t('interactiveMap')}</p>
                <p className="text-xs text-gray-600">{t('interactiveMapDesc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#FCE8E9] rounded-lg">
              <div className="bg-[#A82227] p-2 rounded-full">
                <Navigation className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">{t('pathFinder')}</p>
                <p className="text-xs text-gray-600">{t('pathFinderDesc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#FCE8E9] rounded-lg">
              <div className="bg-[#A82227] p-2 rounded-full">
                <Info className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">{t('roomInformation')}</p>
                <p className="text-xs text-gray-600">{t('roomInformationDesc')}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-start gap-3 p-3 bg-[#FCE8E9] rounded-lg mb-4">
              <div className="bg-[#A82227] p-2 rounded-full">
                <Languages className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm mb-2">{t('language')} / Valoda</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => onLanguageChange('en')}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      language === 'en'
                        ? 'bg-[#A82227] text-white'
                        : 'bg-white text-[#A82227] border border-[#A5968A] hover:bg-[#FCE8E9]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => onLanguageChange('lv')}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      language === 'lv'
                        ? 'bg-[#A82227] text-white'
                        : 'bg-white text-[#A82227] border border-[#A5968A] hover:bg-[#FCE8E9]'
                    }`}
                  >
                    Latviešu
                  </button>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
              RTK Navigation System v1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}