
import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Edit, CreditCard, Package, Link as LinkIcon } from "lucide-react";

// Dashboard translations
const dashboardTranslations = {
  welcomeBack: {
    vi: 'Chào mừng trở lại',
    en: 'Welcome back'
  },
  overview: {
    vi: 'Tổng quan',
    en: 'Overview'
  },
  createNewContent: {
    vi: 'Tạo bài viết mới',
    en: 'Create new content'
  },
  creditsRemaining: {
    vi: 'Tín dụng còn lại',
    en: 'Credits remaining'
  },
  buyMore: {
    vi: 'Mua thêm',
    en: 'Buy more'
  },
  currentPlan: {
    vi: 'Gói hiện tại',
    en: 'Current plan'
  },
  upgrade: {
    vi: 'Nâng cấp',
    en: 'Upgrade'
  },
  connectedAccounts: {
    vi: 'Tài khoản đã kết nối',
    en: 'Connected accounts'
  },
  manage: {
    vi: 'Quản lý',
    en: 'Manage'
  },
  recentContents: {
    vi: 'Bài viết gần đây',
    en: 'Recent contents'
  },
  viewAll: {
    vi: 'Xem tất cả',
    en: 'View all'
  },
  noContentYet: {
    vi: 'Bạn chưa có bài viết nào. Hãy tạo bài viết đầu tiên!',
    en: 'You don\'t have any content yet. Create your first content!'
  }
};

const Dashboard = () => {
  const { language } = useLanguage();

  // Mock user data
  const user = {
    name: "John Doe",
    credits: 85,
    plan: "Professional",
    connectedAccounts: 2,
    recentContents: [] // Empty array to simulate no contents yet
  };

  // Get translation from dashboard translations
  const getTranslation = (key: string): string => {
    return dashboardTranslations[key]?.[language] || key;
  };

  // Helper function to format currency according to language
  const formatCurrency = (value: number): string => {
    if (language === 'vi') {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value / 23000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {getTranslation('welcomeBack')}, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            {getTranslation('overview')}
          </p>
        </div>

        {/* Quick action */}
        <Card className="bg-seo-blue text-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">{getTranslation('createNewContent')}</h2>
              <p className="opacity-80 max-w-md">
                {language === 'vi' 
                  ? 'Tạo bài viết được tối ưu cho SEO và đăng lên website hoặc mạng xã hội của bạn' 
                  : 'Create SEO-optimized content and publish it to your website or social media'}
              </p>
            </div>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/dashboard/create">
                <Edit className="mr-2 h-5 w-5" />
                {getTranslation('createNewContent')}
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Credits card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {getTranslation('creditsRemaining')}
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.credits}</div>
              <Button variant="outline" size="sm" className="mt-3" asChild>
                <Link to="/dashboard/credits">
                  {getTranslation('buyMore')}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Current plan card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {getTranslation('currentPlan')}
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.plan}</div>
              <Button variant="outline" size="sm" className="mt-3" asChild>
                <Link to="/dashboard/subscription">
                  {getTranslation('upgrade')}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Connected accounts card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {getTranslation('connectedAccounts')}
              </CardTitle>
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.connectedAccounts}</div>
              <Button variant="outline" size="sm" className="mt-3" asChild>
                <Link to="/dashboard/connections">
                  {getTranslation('manage')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent contents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>{getTranslation('recentContents')}</CardTitle>
            {user.recentContents.length > 0 && (
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard/contents">
                  {getTranslation('viewAll')}
                </Link>
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {user.recentContents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  {getTranslation('noContentYet')}
                </p>
                <Button asChild>
                  <Link to="/dashboard/create">
                    <Edit className="mr-2 h-5 w-5" />
                    {getTranslation('createNewContent')}
                  </Link>
                </Button>
              </div>
            ) : (
              <div>
                {/* Content list would go here */}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
