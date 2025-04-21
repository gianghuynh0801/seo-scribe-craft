
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'vi' | 'en';

type Translations = {
  [key: string]: {
    vi: string;
    en: string;
  };
};

const translations: Translations = {
  // Navigation
  home: {
    vi: 'Trang chủ',
    en: 'Home',
  },
  features: {
    vi: 'Tính năng',
    en: 'Features',
  },
  pricing: {
    vi: 'Bảng giá',
    en: 'Pricing',
  },
  login: {
    vi: 'Đăng nhập',
    en: 'Login',
  },
  register: {
    vi: 'Đăng ký',
    en: 'Register',
  },
  // Hero section
  heroTitle: {
    vi: 'Tạo bài viết chuẩn SEO trong vài phút',
    en: 'Create SEO-optimized content in minutes',
  },
  heroSubtitle: {
    vi: 'Công cụ giúp bạn tạo nội dung chất lượng cao cho website và mạng xã hội',
    en: 'The tool that helps you create high-quality content for websites and social media',
  },
  getStarted: {
    vi: 'Bắt đầu ngay',
    en: 'Get Started',
  },
  learnMore: {
    vi: 'Tìm hiểu thêm',
    en: 'Learn More',
  },
  // Features section
  featuresTitle: {
    vi: 'Tính năng nổi bật',
    en: 'Key Features',
  },
  featureSEOTitle: {
    vi: 'Tối ưu hóa SEO',
    en: 'SEO Optimization',
  },
  featureSEODesc: {
    vi: 'Tạo bài viết được tối ưu cho công cụ tìm kiếm giúp tăng thứ hạng website',
    en: 'Create content optimized for search engines to improve your website ranking',
  },
  featureSocialTitle: {
    vi: 'Đăng lên mạng xã hội',
    en: 'Social Media Publishing',
  },
  featureSocialDesc: {
    vi: 'Đăng bài trực tiếp lên Facebook, TikTok, Twitter và WordPress',
    en: 'Publish content directly to Facebook, TikTok, Twitter and WordPress',
  },
  featureAITitle: {
    vi: 'Hỗ trợ bởi AI',
    en: 'AI Powered',
  },
  featureAIDesc: {
    vi: 'Sử dụng trí tuệ nhân tạo để tạo nội dung chất lượng cao',
    en: 'Use artificial intelligence to create high-quality content',
  },
  // Pricing section
  pricingTitle: {
    vi: 'Bảng giá',
    en: 'Pricing Plans',
  },
  monthly: {
    vi: 'Theo tháng',
    en: 'Monthly',
  },
  yearly: {
    vi: 'Theo năm',
    en: 'Yearly',
  },
  basicPlan: {
    vi: 'Cơ bản',
    en: 'Basic',
  },
  proPlan: {
    vi: 'Chuyên nghiệp',
    en: 'Professional',
  },
  enterprisePlan: {
    vi: 'Doanh nghiệp',
    en: 'Enterprise',
  },
  perMonth: {
    vi: '/tháng',
    en: '/month',
  },
  perYear: {
    vi: '/năm',
    en: '/year',
  },
  choosePlan: {
    vi: 'Chọn gói',
    en: 'Choose Plan',
  },
  // Features list
  storage: {
    vi: 'Lưu trữ',
    en: 'Storage',
  },
  credits: {
    vi: 'Tín dụng',
    en: 'Credits',
  },
  connections: {
    vi: 'Kết nối mạng xã hội',
    en: 'Social Media Connections',
  },
  support: {
    vi: 'Hỗ trợ',
    en: 'Support',
  },
  // CTA
  ctaTitle: {
    vi: 'Sẵn sàng tạo nội dung tuyệt vời?',
    en: 'Ready to create amazing content?',
  },
  ctaSubtitle: {
    vi: 'Đăng ký ngay hôm nay để bắt đầu tạo nội dung chất lượng cao',
    en: 'Sign up today to start creating high-quality content',
  },
  contactUs: {
    vi: 'Liên hệ với chúng tôi',
    en: 'Contact Us',
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
