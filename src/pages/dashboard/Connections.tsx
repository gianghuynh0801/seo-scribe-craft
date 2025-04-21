
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Facebook, Twitter, FileText, Link as LinkIcon, Plus, Trash2, Check, X } from "lucide-react";

// Connections translations
const connectionsTranslations = {
  connections: {
    vi: 'Kết nối',
    en: 'Connections'
  },
  manageConnections: {
    vi: 'Quản lý kết nối mạng xã hội',
    en: 'Manage social media connections'
  },
  activeConnections: {
    vi: 'Kết nối đã kích hoạt',
    en: 'Active Connections'
  },
  newConnection: {
    vi: 'Thêm kết nối mới',
    en: 'Add New Connection'
  },
  platform: {
    vi: 'Nền tảng',
    en: 'Platform'
  },
  accountName: {
    vi: 'Tên tài khoản',
    en: 'Account Name'
  },
  status: {
    vi: 'Trạng thái',
    en: 'Status'
  },
  actions: {
    vi: 'Thao tác',
    en: 'Actions'
  },
  connected: {
    vi: 'Đã kết nối',
    en: 'Connected'
  },
  connect: {
    vi: 'Kết nối',
    en: 'Connect'
  },
  disconnect: {
    vi: 'Ngắt kết nối',
    en: 'Disconnect'
  },
  edit: {
    vi: 'Chỉnh sửa',
    en: 'Edit'
  },
  delete: {
    vi: 'Xóa',
    en: 'Delete'
  },
  wordpress: {
    vi: 'WordPress',
    en: 'WordPress'
  },
  facebook: {
    vi: 'Facebook',
    en: 'Facebook'
  },
  twitter: {
    vi: 'Twitter',
    en: 'Twitter'
  },
  tiktok: {
    vi: 'TikTok',
    en: 'TikTok'
  },
  selectPlatform: {
    vi: 'Chọn nền tảng',
    en: 'Select Platform'
  },
  platformDetails: {
    vi: 'Chi tiết nền tảng',
    en: 'Platform Details'
  },
  websiteUrl: {
    vi: 'URL Website',
    en: 'Website URL'
  },
  username: {
    vi: 'Tên người dùng',
    en: 'Username'
  },
  apiKey: {
    vi: 'API Key',
    en: 'API Key'
  },
  apiSecret: {
    vi: 'API Secret',
    en: 'API Secret'
  },
  saveConnection: {
    vi: 'Lưu kết nối',
    en: 'Save Connection'
  },
  cancel: {
    vi: 'Hủy',
    en: 'Cancel'
  },
  confirmDisconnect: {
    vi: 'Bạn có chắc chắn muốn ngắt kết nối tài khoản này?',
    en: 'Are you sure you want to disconnect this account?'
  },
  confirmDelete: {
    vi: 'Bạn có chắc chắn muốn xóa kết nối này?',
    en: 'Are you sure you want to delete this connection?'
  },
  autoPost: {
    vi: 'Tự động đăng bài',
    en: 'Auto Post'
  },
  connectionSaved: {
    vi: 'Đã lưu kết nối thành công',
    en: 'Connection saved successfully'
  }
};

// Define types for connections
type ConnectionDetails = {
  url?: string;
  username: string;
  apiKey: string;
  apiSecret?: string;
};

type Connection = {
  id: number;
  platform: string;
  accountName: string;
  details: ConnectionDetails;
  status: string;
  autoPost: boolean;
};

// Mock connections data
const initialConnections: Connection[] = [
  {
    id: 1,
    platform: "wordpress",
    accountName: "myblog.com",
    details: {
      url: "https://myblog.com",
      username: "admin",
      apiKey: "wp_1234567890",
    },
    status: "connected",
    autoPost: true
  },
  {
    id: 2,
    platform: "facebook",
    accountName: "John Doe",
    details: {
      username: "johndoe",
      apiKey: "fb_1234567890",
      apiSecret: "fb_secret_1234"
    },
    status: "connected",
    autoPost: false
  }
];

// Platform options
const platformOptions = [
  { value: "wordpress", label: "WordPress", icon: FileText },
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "twitter", label: "Twitter", icon: Twitter },
  { value: "tiktok", label: "TikTok", icon: LinkIcon }
];

const Connections = () => {
  const { language } = useLanguage();
  const [connections, setConnections] = useState(initialConnections);
  const [currentTab, setCurrentTab] = useState("active");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [newConnection, setNewConnection] = useState<Omit<Connection, 'id' | 'status'>>({
    platform: "",
    accountName: "",
    details: {
      url: "",
      username: "",
      apiKey: "",
      apiSecret: ""
    },
    autoPost: true
  });
  
  // Get translation from connections translations
  const getTranslation = (key: string): string => {
    return connectionsTranslations[key]?.[language] || key;
  };
  
  const handleAddConnection = () => {
    if (!newConnection.platform || !newConnection.accountName) return;
    
    const newId = connections.length > 0 
      ? Math.max(...connections.map(c => c.id)) + 1 
      : 1;
    
    setConnections([
      ...connections,
      {
        id: newId,
        platform: newConnection.platform,
        accountName: newConnection.accountName,
        details: newConnection.details,
        status: "connected",
        autoPost: newConnection.autoPost
      }
    ]);
    
    // Reset form
    setNewConnection({
      platform: "",
      accountName: "",
      details: {
        url: "",
        username: "",
        apiKey: "",
        apiSecret: ""
      },
      autoPost: true
    } as Omit<Connection, 'id' | 'status'>);
    
    setSelectedPlatform("");
    setCurrentTab("active");
  };
  
  const handleDeleteConnection = (id: number) => {
    setConnections(connections.filter(c => c.id !== id));
  };
  
  const handleToggleAutoPost = (id: number) => {
    setConnections(connections.map(c => 
      c.id === id ? { ...c, autoPost: !c.autoPost } : c
    ));
  };
  
  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform);
    setNewConnection({
      ...newConnection,
      platform
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'details') {
        setNewConnection({
          ...newConnection,
          details: {
            ...newConnection.details,
            [child]: value
          }
        });
      }
    } else {
      setNewConnection({
        ...newConnection,
        [name]: value
      });
    }
  };
  
  // Get platform icon component
  const getPlatformIcon = (platform: string) => {
    const platformInfo = platformOptions.find(p => p.value === platform);
    if (platformInfo) {
      const IconComponent = platformInfo.icon;
      return <IconComponent className="h-5 w-5" />;
    }
    return <LinkIcon className="h-5 w-5" />;
  };
  
  // Get platform label
  const getPlatformLabel = (platform: string): string => {
    return getTranslation(platform);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{getTranslation('connections')}</h1>
          <p className="text-muted-foreground">
            {getTranslation('manageConnections')}
          </p>
        </div>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="active">{getTranslation('activeConnections')}</TabsTrigger>
            <TabsTrigger value="new">{getTranslation('newConnection')}</TabsTrigger>
          </TabsList>
          
          {/* Active connections tab */}
          <TabsContent value="active" className="space-y-4">
            {connections.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>{getTranslation('activeConnections')}</CardTitle>
                  <CardDescription>
                    {language === 'vi'
                      ? 'Tài khoản mạng xã hội và website đã kết nối'
                      : 'Connected social media accounts and websites'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">{getTranslation('platform')}</th>
                          <th className="text-left py-3 px-4 font-medium">{getTranslation('accountName')}</th>
                          <th className="text-left py-3 px-4 font-medium">{getTranslation('status')}</th>
                          <th className="text-left py-3 px-4 font-medium">{getTranslation('autoPost')}</th>
                          <th className="text-right py-3 px-4 font-medium">{getTranslation('actions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {connections.map((connection) => (
                          <tr key={connection.id} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <span className="flex-shrink-0">
                                  {getPlatformIcon(connection.platform)}
                                </span>
                                <span>{getPlatformLabel(connection.platform)}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{connection.accountName}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                <Check className="h-3.5 w-3.5 mr-1" />
                                {getTranslation('connected')}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Switch
                                checked={connection.autoPost}
                                onCheckedChange={() => handleToggleAutoPost(connection.id)}
                              />
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                  onClick={() => handleDeleteConnection(connection.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => setCurrentTab("new")}>
                    <Plus className="h-4 w-4 mr-2" />
                    {getTranslation('newConnection')}
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{getTranslation('activeConnections')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <LinkIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      {language === 'vi'
                        ? 'Bạn chưa có kết nối nào. Hãy thêm kết nối đầu tiên!'
                        : 'You don\'t have any connections yet. Add your first connection!'
                      }
                    </p>
                    <Button onClick={() => setCurrentTab("new")}>
                      <Plus className="h-4 w-4 mr-2" />
                      {getTranslation('newConnection')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* New connection tab */}
          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>{getTranslation('newConnection')}</CardTitle>
                <CardDescription>
                  {language === 'vi'
                    ? 'Kết nối tài khoản mạng xã hội hoặc website của bạn'
                    : 'Connect your social media account or website'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{getTranslation('selectPlatform')}</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {platformOptions.map((platform) => {
                      const Icon = platform.icon;
                      return (
                        <div
                          key={platform.value}
                          className={`border rounded-lg p-4 text-center cursor-pointer transition-colors ${
                            selectedPlatform === platform.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => handlePlatformChange(platform.value)}
                        >
                          <Icon className={`h-10 w-10 mx-auto mb-2 ${
                            selectedPlatform === platform.value ? 'text-blue-500' : 'text-gray-500'
                          }`} />
                          <div className="font-medium">{getTranslation(platform.value)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {selectedPlatform && (
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">{getTranslation('platformDetails')}</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="accountName">{getTranslation('accountName')}</Label>
                      <Input
                        id="accountName"
                        name="accountName"
                        value={newConnection.accountName}
                        onChange={handleInputChange}
                        placeholder={language === 'vi' ? 'Nhập tên tài khoản' : 'Enter account name'}
                      />
                    </div>
                    
                    {selectedPlatform === 'wordpress' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="details.url">{getTranslation('websiteUrl')}</Label>
                          <Input
                            id="details.url"
                            name="details.url"
                            value={newConnection.details.url}
                            onChange={handleInputChange}
                            placeholder="https://example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="details.username">{getTranslation('username')}</Label>
                          <Input
                            id="details.username"
                            name="details.username"
                            value={newConnection.details.username}
                            onChange={handleInputChange}
                            placeholder={language === 'vi' ? 'Tên người dùng WordPress' : 'WordPress username'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="details.apiKey">{getTranslation('apiKey')}</Label>
                          <Input
                            id="details.apiKey"
                            name="details.apiKey"
                            value={newConnection.details.apiKey}
                            onChange={handleInputChange}
                            placeholder={language === 'vi' ? 'Khóa API của WordPress' : 'WordPress API key'}
                          />
                        </div>
                      </>
                    )}
                    
                    {(selectedPlatform === 'facebook' || selectedPlatform === 'twitter' || selectedPlatform === 'tiktok') && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="details.username">{getTranslation('username')}</Label>
                          <Input
                            id="details.username"
                            name="details.username"
                            value={newConnection.details.username}
                            onChange={handleInputChange}
                            placeholder={`${getPlatformLabel(selectedPlatform)} ${language === 'vi' ? 'tên người dùng' : 'username'}`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="details.apiKey">{getTranslation('apiKey')}</Label>
                          <Input
                            id="details.apiKey"
                            name="details.apiKey"
                            value={newConnection.details.apiKey}
                            onChange={handleInputChange}
                            placeholder={`${getPlatformLabel(selectedPlatform)} API key`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="details.apiSecret">{getTranslation('apiSecret')}</Label>
                          <Input
                            id="details.apiSecret"
                            name="details.apiSecret"
                            type="password"
                            value={newConnection.details.apiSecret}
                            onChange={handleInputChange}
                            placeholder={`${getPlatformLabel(selectedPlatform)} API secret`}
                          />
                        </div>
                      </>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="autoPost"
                        checked={newConnection.autoPost}
                        onCheckedChange={(checked) => setNewConnection({...newConnection, autoPost: checked})}
                      />
                      <Label htmlFor="autoPost">{getTranslation('autoPost')}</Label>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentTab("active")}
                >
                  {getTranslation('cancel')}
                </Button>
                <Button 
                  onClick={handleAddConnection}
                  disabled={!selectedPlatform || !newConnection.accountName}
                >
                  {getTranslation('saveConnection')}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Connections;
