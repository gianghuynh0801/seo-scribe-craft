
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={language === 'vi' ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage('vi')}
        className="text-xs px-2 py-1 h-auto"
      >
        Tiếng Việt
      </Button>
      <Button
        variant={language === 'en' ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage('en')}
        className="text-xs px-2 py-1 h-auto"
      >
        English
      </Button>
    </div>
  );
}
