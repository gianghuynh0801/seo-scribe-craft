
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Add translations for forgot password
const forgotPasswordTranslations = {
  forgotPasswordTitle: {
    vi: 'Quên mật khẩu',
    en: 'Forgot password'
  },
  forgotPasswordSubtitle: {
    vi: 'Nhập địa chỉ email của bạn để nhận hướng dẫn đặt lại mật khẩu',
    en: 'Enter your email address to receive password reset instructions'
  },
  email: {
    vi: 'Email',
    en: 'Email'
  },
  resetButton: {
    vi: 'Gửi hướng dẫn đặt lại',
    en: 'Send reset instructions'
  },
  backToLogin: {
    vi: 'Quay lại đăng nhập',
    en: 'Back to login'
  },
  loading: {
    vi: 'Đang xử lý...',
    en: 'Processing...'
  },
  resetLinkSent: {
    vi: 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.',
    en: 'Password reset instructions have been sent to your email.'
  }
};

const ForgotPassword = () => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get translation from either main translations or forgot password-specific ones
  const getTranslation = (key: string): string => {
    // Try to get from main translations first
    try {
      return t(key);
    } catch (e) {
      // If not found, try from forgot password translations
      if (forgotPasswordTranslations[key]) {
        return forgotPasswordTranslations[key][language];
      }
      return key;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset API call
    setTimeout(() => {
      console.log("Password reset requested for:", email);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{getTranslation('forgotPasswordTitle')}</CardTitle>
            <CardDescription>{getTranslation('forgotPasswordSubtitle')}</CardDescription>
          </CardHeader>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{getTranslation('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? getTranslation('loading') : getTranslation('resetButton')}
                </Button>
                <div className="text-sm text-center">
                  <Link to="/login" className="text-blue-600 hover:underline">
                    {getTranslation('backToLogin')}
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-4">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{getTranslation('resetLinkSent')}</span>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login">{getTranslation('backToLogin')}</Link>
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
