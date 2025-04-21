
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, User, Settings, LogOut } from "lucide-react";

// Header translations
const headerTranslations = {
  notifications: {
    vi: 'Thông báo',
    en: 'Notifications'
  },
  profile: {
    vi: 'Hồ sơ',
    en: 'Profile'
  },
  settings: {
    vi: 'Cài đặt',
    en: 'Settings'
  },
  logout: {
    vi: 'Đăng xuất',
    en: 'Log out'
  }
};

export function DashboardHeader() {
  const { language } = useLanguage();
  
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "" // placeholder for user avatar
  };
  
  // Get translation from header translations
  const getTranslation = (key: string): string => {
    return headerTranslations[key]?.[language] || key;
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-0 md:left-64 z-20">
      <div className="h-full flex items-center justify-between px-4 md:px-6">
        <div className="flex-1"></div>
        
        <div className="flex items-center space-x-4">
          <LanguageToggle />
          
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-seo-blue text-white">
                  {user.name.split(' ').map(part => part[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="font-semibold">{user.name}</div>
                <div className="text-xs text-gray-500 mt-1">{user.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{getTranslation('profile')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>{getTranslation('settings')}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{getTranslation('logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
