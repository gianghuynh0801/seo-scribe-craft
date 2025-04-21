
// The LanguageToggle component already uses the globe icon with a popover and buttons to switch language.
// No changes needed here.

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="flex flex-col space-y-1">
          <Button
            variant={language === 'vi' ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguage('vi')}
            className="justify-start"
          >
            Tiếng Việt
          </Button>
          <Button
            variant={language === 'en' ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguage('en')}
            className="justify-start"
          >
            English
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

