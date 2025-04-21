
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-seo-blue">SEO Scribe</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-gray-700 hover:text-seo-blue px-3 py-2 text-sm font-medium">
              {t('home')}
            </Link>
            <a href="#features" className="text-gray-700 hover:text-seo-blue px-3 py-2 text-sm font-medium">
              {t('features')}
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-seo-blue px-3 py-2 text-sm font-medium">
              {t('pricing')}
            </a>
            <div className="ml-4 flex items-center space-x-2">
              <LanguageToggle />
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">{t('login')}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">{t('register')}</Link>
              </Button>
            </div>
          </div>
          
          <div className="flex md:hidden items-center">
            <LanguageToggle />
            <button
              type="button"
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-seo-blue focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-seo-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <a 
              href="#features" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-seo-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('features')}
            </a>
            <a 
              href="#pricing" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-seo-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('pricing')}
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  {t('login')}
                </Link>
              </Button>
              <Button size="sm" className="w-full" asChild>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  {t('register')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
