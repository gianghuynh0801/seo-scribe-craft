
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Add translations for authentication
const authTranslations = {
  loginTitle: {
    vi: 'Đăng nhập vào tài khoản',
    en: 'Log in to your account'
  },
  loginSubtitle: {
    vi: 'Nhập thông tin đăng nhập của bạn để tiếp tục',
    en: 'Enter your credentials to continue'
  },
  email: {
    vi: 'Email',
    en: 'Email'
  },
  password: {
    vi: 'Mật khẩu',
    en: 'Password'
  },
  forgotPassword: {
    vi: 'Quên mật khẩu?',
    en: 'Forgot password?'
  },
  loginButton: {
    vi: 'Đăng nhập',
    en: 'Log in'
  },
  noAccount: {
    vi: 'Chưa có tài khoản?',
    en: 'Don\'t have an account?'
  },
  createAccount: {
    vi: 'Tạo tài khoản',
    en: 'Create account'
  },
  loading: {
    vi: 'Đang xử lý...',
    en: 'Processing...'
  }
};

const Login = () => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get translation from either main translations or auth-specific ones
  const getTranslation = (key: string): string => {
    // Try to get from main translations first
    try {
      return t(key);
    } catch (e) {
      // If not found, try from auth translations
      if (authTranslations[key]) {
        return authTranslations[key][language];
      }
      return key;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      console.log("Login attempted with:", { email, password });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{getTranslation('loginTitle')}</CardTitle>
            <CardDescription>{getTranslation('loginSubtitle')}</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{getTranslation('password')}</Label>
                  <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                    {getTranslation('forgotPassword')}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? getTranslation('loading') : getTranslation('loginButton')}
              </Button>
              <div className="text-sm text-center">
                {getTranslation('noAccount')}{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                  {getTranslation('createAccount')}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
