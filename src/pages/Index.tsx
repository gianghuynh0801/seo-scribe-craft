
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock feature data
const features = [
  {
    id: 1,
    icon: "🔍",
    titleKey: "featureSEOTitle",
    descriptionKey: "featureSEODesc",
    color: "bg-blue-50 text-seo-blue"
  },
  {
    id: 2,
    icon: "📱",
    titleKey: "featureSocialTitle",
    descriptionKey: "featureSocialDesc",
    color: "bg-green-50 text-seo-green"
  },
  {
    id: 3,
    icon: "🤖",
    titleKey: "featureAITitle",
    descriptionKey: "featureAIDesc",
    color: "bg-purple-50 text-seo-purple"
  }
];

// Mock pricing data
const pricingPlans = [
  {
    id: "basic",
    titleKey: "basicPlan",
    monthlyPrice: 99000,
    yearlyPrice: 999000,
    features: [
      { key: "storage", value: "10GB" },
      { key: "credits", value: "100" },
      { key: "connections", value: "2" },
      { key: "support", value: "Email" },
    ],
    color: "border-blue-200 hover:border-blue-300"
  },
  {
    id: "pro",
    titleKey: "proPlan",
    monthlyPrice: 199000,
    yearlyPrice: 1999000,
    features: [
      { key: "storage", value: "50GB" },
      { key: "credits", value: "500" },
      { key: "connections", value: "5" },
      { key: "support", value: "Priority Email" },
    ],
    color: "border-green-200 hover:border-green-300",
    highlight: true
  },
  {
    id: "enterprise",
    titleKey: "enterprisePlan",
    monthlyPrice: 399000,
    yearlyPrice: 3999000,
    features: [
      { key: "storage", value: "200GB" },
      { key: "credits", value: "2000" },
      { key: "connections", value: "Unlimited" },
      { key: "support", value: "24/7 Phone & Email" },
    ],
    color: "border-purple-200 hover:border-purple-300"
  }
];

// Format price helper
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(price);
};

const Index = () => {
  const { t, language } = useLanguage();
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t('heroTitle')}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button size="lg" asChild>
                  <Link to="/register">{t('getStarted')}</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#features">{t('learnMore')}</a>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://source.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="SEO Content Creation" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('featuresTitle')}
            </h2>
            <div className="w-16 h-1 bg-seo-blue mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className={`inline-block p-3 rounded-full text-2xl mb-4 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-gray-600">{t(feature.descriptionKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('pricingTitle')}
            </h2>
            <div className="w-16 h-1 bg-seo-blue mx-auto mb-6"></div>
            
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className={`text-sm ${!isYearly ? 'font-semibold text-seo-blue' : 'text-gray-600'}`}>
                {t('monthly')}
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                id="billing-toggle"
              />
              <span className={`text-sm ${isYearly ? 'font-semibold text-seo-blue' : 'text-gray-600'}`}>
                {t('yearly')}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {isYearly ? 'Save 15% with yearly billing' : ''}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`border-2 ${plan.color} ${plan.highlight ? 'relative' : ''}`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-seo-green text-white text-xs font-bold py-1 px-3 rounded-full">
                    {language === 'vi' ? 'Phổ biến nhất' : 'Most Popular'}
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{t(plan.titleKey)}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">
                      {formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {isYearly ? t('perYear') : t('perMonth')}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>
                          <span className="font-medium">{t(feature.key)}: </span> 
                          {feature.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                    {t('choosePlan')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-seo-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/register">{t('getStarted')}</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-seo-blue" size="lg" asChild>
              <Link to="/contact">{t('contactUs')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">SEO Scribe</h3>
              <p className="mb-4 text-sm opacity-75">
                {language === 'vi' 
                  ? 'Công cụ tạo nội dung chuẩn SEO hàng đầu cho website và mạng xã hội'
                  : 'The leading SEO content creation tool for websites and social media'
                }
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                {language === 'vi' ? 'Liên kết' : 'Links'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white">{t('home')}</Link></li>
                <li><a href="#features" className="hover:text-white">{t('features')}</a></li>
                <li><a href="#pricing" className="hover:text-white">{t('pricing')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                {language === 'vi' ? 'Pháp lý' : 'Legal'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terms" className="hover:text-white">
                  {language === 'vi' ? 'Điều khoản sử dụng' : 'Terms of Service'}
                </Link></li>
                <li><Link to="/privacy" className="hover:text-white">
                  {language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
                </Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                {language === 'vi' ? 'Liên hệ' : 'Contact'}
              </h3>
              <p className="text-sm opacity-75 mb-2">
                {language === 'vi' ? 'Email: support@seoscribe.vn' : 'Email: support@seoscribe.com'}
              </p>
              <p className="text-sm opacity-75">
                {language === 'vi' ? 'Điện thoại: +84 123 456 789' : 'Phone: +84 123 456 789'}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center opacity-75">
            &copy; {new Date().getFullYear()} SEO Scribe. {language === 'vi' ? 'Đã đăng ký bản quyền.' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
