
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Calendar, Wallet, Check } from "lucide-react";

// Credits page translations
const creditsTranslations = {
  credits: {
    vi: 'Tín dụng',
    en: 'Credits'
  },
  buyCredits: {
    vi: 'Mua tín dụng',
    en: 'Buy Credits'
  },
  availableCredits: {
    vi: 'Tín dụng hiện có',
    en: 'Available Credits'
  },
  purchaseCredits: {
    vi: 'Mua tín dụng',
    en: 'Purchase Credits'
  },
  transactionHistory: {
    vi: 'Lịch sử giao dịch',
    en: 'Transaction History'
  },
  chooseCreditPackage: {
    vi: 'Chọn gói tín dụng',
    en: 'Choose Credit Package'
  },
  selectPayment: {
    vi: 'Chọn phương thức thanh toán',
    en: 'Select Payment Method'
  },
  paymentDetails: {
    vi: 'Thông tin thanh toán',
    en: 'Payment Details'
  },
  cardNumber: {
    vi: 'Số thẻ',
    en: 'Card Number'
  },
  cardholderName: {
    vi: 'Tên chủ thẻ',
    en: 'Cardholder Name'
  },
  expiryDate: {
    vi: 'Ngày hết hạn',
    en: 'Expiry Date'
  },
  cvc: {
    vi: 'CVC',
    en: 'CVC'
  },
  payNow: {
    vi: 'Thanh toán ngay',
    en: 'Pay Now'
  },
  date: {
    vi: 'Ngày',
    en: 'Date'
  },
  description: {
    vi: 'Mô tả',
    en: 'Description'
  },
  amount: {
    vi: 'Số tiền',
    en: 'Amount'
  },
  status: {
    vi: 'Trạng thái',
    en: 'Status'
  },
  completed: {
    vi: 'Hoàn thành',
    en: 'Completed'
  },
  pending: {
    vi: 'Đang xử lý',
    en: 'Pending'
  },
  mostPopular: {
    vi: 'Phổ biến nhất',
    en: 'Most Popular'
  },
  bestValue: {
    vi: 'Giá trị nhất',
    en: 'Best Value'
  }
};

// Credit packages
const creditPackages = [
  {
    id: 1,
    credits: 100,
    price: 199000,
    priceUSD: 8.99,
    popular: false,
    bestValue: false
  },
  {
    id: 2,
    credits: 500,
    price: 899000,
    priceUSD: 39.99,
    popular: true,
    bestValue: false
  },
  {
    id: 3,
    credits: 1000,
    price: 1599000,
    priceUSD: 69.99,
    popular: false,
    bestValue: true
  }
];

// Transaction history mock data
const transactions = [
  {
    id: 1,
    date: "2023-11-25",
    description: "Purchase: 500 credits",
    amount: 899000,
    amountUSD: 39.99,
    status: "completed"
  },
  {
    id: 2,
    date: "2023-10-12",
    description: "Purchase: 100 credits",
    amount: 199000,
    amountUSD: 8.99,
    status: "completed"
  }
];

const Credits = () => {
  const { language } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState("purchase");

  // Get translation from credits translations
  const getTranslation = (key: string): string => {
    return creditsTranslations[key]?.[language] || key;
  };

  // Format currency according to language
  const formatCurrency = (value: number): string => {
    if (language === 'vi') {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value / 23000);
  };

  // Format date according to language
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (language === 'vi') {
      return new Intl.DateTimeFormat('vi-VN').format(date);
    }
    return new Intl.DateTimeFormat('en-US').format(date);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{getTranslation('credits')}</h1>
          <p className="text-muted-foreground">
            {language === 'vi'
              ? 'Quản lý và mua tín dụng cho tài khoản của bạn'
              : 'Manage and purchase credits for your account'
            }
          </p>
        </div>

        {/* Credit balance card */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold opacity-90 mb-1">{getTranslation('availableCredits')}</h2>
                <p className="text-4xl font-bold">85</p>
              </div>
              <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center">
                <Wallet className="h-7 w-7" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for purchase and history */}
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="purchase">{getTranslation('purchaseCredits')}</TabsTrigger>
            <TabsTrigger value="history">{getTranslation('transactionHistory')}</TabsTrigger>
          </TabsList>
          
          {/* Purchase credits tab */}
          <TabsContent value="purchase" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{getTranslation('chooseCreditPackage')}</CardTitle>
                <CardDescription>
                  {language === 'vi'
                    ? 'Chọn gói tín dụng phù hợp với nhu cầu của bạn'
                    : 'Choose a credit package that suits your needs'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {creditPackages.map((pack) => (
                    <div 
                      key={pack.id}
                      className={`border-2 rounded-lg p-5 relative cursor-pointer transition-all hover:shadow-md ${
                        selectedPackage === pack.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedPackage(pack.id)}
                    >
                      {pack.popular && (
                        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3 bg-blue-500 text-white text-xs py-1 px-3 rounded-full">
                          {getTranslation('mostPopular')}
                        </div>
                      )}
                      
                      {pack.bestValue && (
                        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3 bg-green-500 text-white text-xs py-1 px-3 rounded-full">
                          {getTranslation('bestValue')}
                        </div>
                      )}
                      
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold">{pack.credits}</div>
                        <div className="text-gray-500 text-sm">credits</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {language === 'vi' 
                            ? formatCurrency(pack.price) 
                            : formatCurrency(pack.priceUSD * 23000)
                          }
                        </div>
                        <div className="text-gray-500 text-sm">
                          {language === 'vi'
                            ? `${(pack.price / pack.credits).toLocaleString('vi-VN')}đ/credit`
                            : `$${(pack.priceUSD / pack.credits).toFixed(2)}/credit`
                          }
                        </div>
                      </div>
                      
                      {selectedPackage === pack.id && (
                        <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  disabled={selectedPackage === null}
                >
                  {selectedPackage !== null
                    ? `${getTranslation('payNow')} - ${
                        language === 'vi'
                          ? formatCurrency(creditPackages.find(p => p.id === selectedPackage)?.price || 0)
                          : formatCurrency((creditPackages.find(p => p.id === selectedPackage)?.priceUSD || 0) * 23000)
                      }`
                    : getTranslation('chooseCreditPackage')
                  }
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{getTranslation('selectPayment')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border rounded-lg p-4 flex justify-center items-center bg-gray-50 cursor-pointer hover:bg-gray-100">
                      <div className="text-center">
                        <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                        <div className="text-sm font-medium">Stripe</div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 flex justify-center items-center bg-gray-50 cursor-pointer hover:bg-gray-100">
                      <div className="text-center">
                        <div className="font-bold text-lg text-purple-600 mb-1">MoMo</div>
                        <div className="text-sm font-medium">MoMo</div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 flex justify-center items-center bg-gray-50 cursor-pointer hover:bg-gray-100">
                      <div className="text-center">
                        <div className="font-bold text-lg text-blue-600 mb-1">VNPay</div>
                        <div className="text-sm font-medium">VNPay</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Transaction history tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>{getTranslation('transactionHistory')}</CardTitle>
                <CardDescription>
                  {language === 'vi'
                    ? 'Lịch sử giao dịch mua tín dụng của bạn'
                    : 'Your credit purchase transaction history'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">{getTranslation('date')}</th>
                          <th className="text-left py-3 px-4 font-medium">{getTranslation('description')}</th>
                          <th className="text-right py-3 px-4 font-medium">{getTranslation('amount')}</th>
                          <th className="text-right py-3 px-4 font-medium">{getTranslation('status')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b">
                            <td className="py-3 px-4">{formatDate(transaction.date)}</td>
                            <td className="py-3 px-4">{transaction.description}</td>
                            <td className="py-3 px-4 text-right">
                              {language === 'vi'
                                ? formatCurrency(transaction.amount)
                                : formatCurrency(transaction.amountUSD * 23000)
                              }
                            </td>
                            <td className="py-3 px-4 text-right">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                transaction.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {getTranslation(transaction.status)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    {language === 'vi'
                      ? 'Chưa có giao dịch nào'
                      : 'No transactions yet'
                    }
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Credits;
