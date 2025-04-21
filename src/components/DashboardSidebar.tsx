
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Edit, 
  CreditCard, 
  Package, 
  Settings, 
  Link as LinkIcon, 
  LogOut, 
  Menu, 
  X
} from "lucide-react";

// Add dashboard translations
const dashboardTranslations = {
  dashboard: {
    vi: 'Bảng điều khiển',
    en: 'Dashboard'
  },
  createContent: {
    vi: 'Tạo bài viết',
    en: 'Create Content'
  },
  credits: {
    vi: 'Tín dụng',
    en: 'Credits'
  },
  subscription: {
    vi: 'Gói đăng ký',
    en: 'Subscription'
  },
  settings: {
    vi: 'Cài đặt',
    en: 'Settings'
  },
  connections: {
    vi: 'Kết nối',
    en: 'Connections'
  },
  logout: {
    vi: 'Đăng xuất',
    en: 'Log out'
  }
};

// Sidebar menu items
const menuItems = [
  {
    path: "/dashboard",
    icon: LayoutDashboard,
    labelKey: "dashboard"
  },
  {
    path: "/dashboard/create",
    icon: Edit,
    labelKey: "createContent"
  },
  {
    path: "/dashboard/credits",
    icon: CreditCard,
    labelKey: "credits"
  },
  {
    path: "/dashboard/subscription",
    icon: Package,
    labelKey: "subscription"
  },
  {
    path: "/dashboard/connections",
    icon: LinkIcon,
    labelKey: "connections"
  },
  {
    path: "/dashboard/settings",
    icon: Settings,
    labelKey: "settings"
  }
];

export function DashboardSidebar() {
  const { language } = useLanguage();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Get translation from dashboard translations
  const getTranslation = (key: string): string => {
    return dashboardTranslations[key]?.[language] || key;
  };
  
  // Check if the current route matches the menu item path
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Mobile menu toggle button
  const MobileMenuToggle = () => (
    <div className="md:hidden flex items-center h-16 px-4 border-b">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMobileMenu}
        className="mr-2"
      >
        {isMobileOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>
      <span className="font-bold text-lg">SEO Scribe</span>
    </div>
  );

  return (
    <>
      <MobileMenuToggle />
      
      <aside 
        className={`bg-white border-r border-gray-200 w-64 fixed inset-y-0 left-0 transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-30 pt-16 md:pt-0`}
      >
        <div className="h-full flex flex-col">
          <div className="hidden md:flex h-16 items-center px-6 border-b">
            <span className="font-bold text-lg">SEO Scribe</span>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-seo-blue text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {getTranslation(item.labelKey)}
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => console.log("Logout clicked")}
            >
              <LogOut className="mr-3 h-5 w-5" />
              {getTranslation('logout')}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
