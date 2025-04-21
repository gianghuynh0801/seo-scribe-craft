
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Add translations for registration
const registerTranslations = {
  registerTitle: {
    vi: 'Tạo tài khoản mới',
    en: 'Create a new account'
  },
  registerSubtitle: {
    vi: 'Điền thông tin để tạo tài khoản của bạn',
    en: 'Fill in your details to create your account'
  },
  fullName: {
    vi: 'Họ và tên',
    en: 'Full name'
  },
  email: {
    vi: 'Email',
    en: 'Email'
  },
  password: {
    vi: 'Mật khẩu',
    en: 'Password'
  },
  confirmPassword: {
    vi: 'Xác nhận mật khẩu',
    en: 'Confirm password'
  },
  termsAndConditions: {
    vi: 'Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật',
    en: 'I agree to the Terms of Service and Privacy Policy'
  },
  registerButton: {
    vi: 'Đăng ký',
    en: 'Register'
  },
  alreadyHaveAccount: {
    vi: 'Đã có tài khoản?',
    en: 'Already have an account?'
  },
  login: {
    vi: 'Đăng nhập',
    en: 'Log in'
  },
  loading: {
    vi: 'Đang xử lý...',
    en: 'Processing...'
  }
};

const Register = () => {
  const { language, t } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Get translation from either main translations or register-specific ones
  const getTranslation = (key: string): string => {
    // Try to get from main translations first
    try {
      return t(key);
    } catch (e) {
      // If not found, try from register translations
      if (registerTranslations[key]) {
        return registerTranslations[key][language];
      }
      return key;
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError(language === 'vi' ? 
        'Mật khẩu và xác nhận mật khẩu không khớp.' : 
        'Password and confirm password do not match.'
      );
      return;
    }
    
    if (!agreeToTerms) {
      setError(language === 'vi' ? 
        'Bạn phải đồng ý với Điều khoản sử dụng và Chính sách bảo mật.' : 
        'You must agree to the Terms of Service and Privacy Policy.'
      );
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration API call
    setTimeout(() => {
      console.log("Registration attempted with:", { fullName, email, password });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{getTranslation('registerTitle')}</CardTitle>
            <CardDescription>{getTranslation('registerSubtitle')}</CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="fullName">{getTranslation('fullName')}</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              
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
              
              <div className="space-y-2">
                <Label htmlFor="password">{getTranslation('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{getTranslation('confirmPassword')}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  {getTranslation('termsAndConditions')}
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? getTranslation('loading') : getTranslation('registerButton')}
              </Button>
              <div className="text-sm text-center">
                {getTranslation('alreadyHaveAccount')}{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                  {getTranslation('login')}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
