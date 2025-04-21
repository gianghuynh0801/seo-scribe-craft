
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Sparkles, Download, Upload, Share2, Facebook, Twitter, FileText } from "lucide-react";

// Content creation translations
const contentTranslations = {
  createContent: {
    vi: 'Tạo bài viết SEO',
    en: 'Create SEO Content'
  },
  inputContentDetails: {
    vi: 'Nhập thông tin cho bài viết của bạn',
    en: 'Input details for your content'
  },
  title: {
    vi: 'Tiêu đề',
    en: 'Title'
  },
  titlePlaceholder: {
    vi: 'Nhập tiêu đề bài viết',
    en: 'Enter content title'
  },
  topic: {
    vi: 'Chủ đề',
    en: 'Topic'
  },
  keywords: {
    vi: 'Từ khóa',
    en: 'Keywords'
  },
  keywordsPlaceholder: {
    vi: 'Nhập từ khóa SEO cách nhau bởi dấu phẩy',
    en: 'Enter SEO keywords separated by commas'
  },
  contentType: {
    vi: 'Loại nội dung',
    en: 'Content Type'
  },
  blogPost: {
    vi: 'Bài viết blog',
    en: 'Blog Post'
  },
  socialPost: {
    vi: 'Bài đăng mạng xã hội',
    en: 'Social Media Post'
  },
  productDescription: {
    vi: 'Mô tả sản phẩm',
    en: 'Product Description'
  },
  instructions: {
    vi: 'Hướng dẫn bổ sung',
    en: 'Additional Instructions'
  },
  instructionsPlaceholder: {
    vi: 'Nhập chi tiết hoặc yêu cầu đặc biệt cho bài viết',
    en: 'Enter details or special requirements for the content'
  },
  targetAudience: {
    vi: 'Đối tượng mục tiêu',
    en: 'Target Audience'
  },
  contentLength: {
    vi: 'Độ dài nội dung',
    en: 'Content Length'
  },
  short: {
    vi: 'Ngắn',
    en: 'Short'
  },
  medium: {
    vi: 'Trung bình',
    en: 'Medium'
  },
  long: {
    vi: 'Dài',
    en: 'Long'
  },
  generateContent: {
    vi: 'Tạo nội dung',
    en: 'Generate Content'
  },
  saving: {
    vi: 'Đang lưu...',
    en: 'Saving...'
  },
  generating: {
    vi: 'Đang tạo nội dung...',
    en: 'Generating content...'
  },
  editor: {
    vi: 'Chỉnh sửa',
    en: 'Editor'
  },
  preview: {
    vi: 'Xem trước',
    en: 'Preview'
  },
  seoScore: {
    vi: 'Điểm SEO',
    en: 'SEO Score'
  },
  saveAsDraft: {
    vi: 'Lưu nháp',
    en: 'Save as Draft'
  },
  downloadPDF: {
    vi: 'Tải PDF',
    en: 'Download PDF'
  },
  publish: {
    vi: 'Xuất bản',
    en: 'Publish'
  },
  publishTo: {
    vi: 'Xuất bản đến',
    en: 'Publish to'
  },
  website: {
    vi: 'Website',
    en: 'Website'
  },
  facebook: {
    vi: 'Facebook',
    en: 'Facebook'
  },
  twitter: {
    vi: 'Twitter',
    en: 'Twitter'
  },
  wordpress: {
    vi: 'WordPress',
    en: 'WordPress'
  },
  useCredits: {
    vi: 'Sử dụng tín dụng',
    en: 'Use Credits'
  },
  creditsRemaining: {
    vi: 'Tín dụng còn lại',
    en: 'Credits remaining'
  }
};

// Content topics
const contentTopics = [
  { value: "technology", label: { vi: "Công nghệ", en: "Technology" } },
  { value: "health", label: { vi: "Sức khỏe", en: "Health" } },
  { value: "finance", label: { vi: "Tài chính", en: "Finance" } },
  { value: "education", label: { vi: "Giáo dục", en: "Education" } },
  { value: "travel", label: { vi: "Du lịch", en: "Travel" } },
  { value: "food", label: { vi: "Ẩm thực", en: "Food" } },
  { value: "fashion", label: { vi: "Thời trang", en: "Fashion" } },
  { value: "business", label: { vi: "Kinh doanh", en: "Business" } },
  { value: "marketing", label: { vi: "Marketing", en: "Marketing" } },
  { value: "entertainment", label: { vi: "Giải trí", en: "Entertainment" } }
];

// Target audiences
const targetAudiences = [
  { value: "general", label: { vi: "Đại chúng", en: "General" } },
  { value: "professional", label: { vi: "Chuyên gia", en: "Professional" } },
  { value: "students", label: { vi: "Học sinh/Sinh viên", en: "Students" } },
  { value: "parents", label: { vi: "Phụ huynh", en: "Parents" } },
  { value: "seniors", label: { vi: "Người cao tuổi", en: "Seniors" } },
  { value: "businesses", label: { vi: "Doanh nghiệp", en: "Businesses" } }
];

const CreateContent = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    keywords: "",
    contentType: "blogPost",
    instructions: "",
    targetAudience: "general",
    contentLength: "medium"
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [currentTab, setCurrentTab] = useState("editor");

  // Get translation from content translations
  const getTranslation = (key: string): string => {
    return contentTranslations[key]?.[language] || key;
  };

  // Get label from topic or audience objects
  const getLabel = (items: any[], value: string): string => {
    const item = items.find(item => item.value === value);
    return item ? item.label[language] : value;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate API call to generate content
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated content
      const mockContent = `
      <h1>${formData.title}</h1>
      <p>This is a generated content about ${getLabel(contentTopics, formData.topic)} for ${getLabel(targetAudiences, formData.targetAudience)}.</p>
      <p>Keywords: ${formData.keywords}</p>
      <h2>Introduction</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Phasellus fermentum tincidunt nibh, at gravida enim rhoncus at.</p>
      <h2>Main Content</h2>
      <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.</p>
      <p>Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta.</p>
      <h2>Conclusion</h2>
      <p>Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta. Nulla porttitor accumsan tincidunt.</p>
      `;
      
      setGeneratedContent(mockContent);
      setCurrentTab("editor");
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    
    // Simulate saving the draft
    setTimeout(() => {
      setIsSaving(false);
      // Notification would be shown here
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{getTranslation('createContent')}</h1>
          <p className="text-muted-foreground">
            {getTranslation('inputContentDetails')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{getTranslation('createContent')}</CardTitle>
                <CardDescription>
                  {language === 'vi' 
                    ? 'Điền thông tin để tạo bài viết được tối ưu hóa cho SEO'
                    : 'Fill in the details to create SEO-optimized content'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{getTranslation('title')}</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder={getTranslation('titlePlaceholder')}
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="topic">{getTranslation('topic')}</Label>
                    <Select
                      value={formData.topic}
                      onValueChange={(value) => handleSelectChange('topic', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={getTranslation('topic')} />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTopics.map((topic) => (
                          <SelectItem key={topic.value} value={topic.value}>
                            {topic.label[language]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contentType">{getTranslation('contentType')}</Label>
                    <Select
                      value={formData.contentType}
                      onValueChange={(value) => handleSelectChange('contentType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={getTranslation('contentType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blogPost">{getTranslation('blogPost')}</SelectItem>
                        <SelectItem value="socialPost">{getTranslation('socialPost')}</SelectItem>
                        <SelectItem value="productDescription">{getTranslation('productDescription')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keywords">{getTranslation('keywords')}</Label>
                  <Input
                    id="keywords"
                    name="keywords"
                    placeholder={getTranslation('keywordsPlaceholder')}
                    value={formData.keywords}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">{getTranslation('targetAudience')}</Label>
                    <Select
                      value={formData.targetAudience}
                      onValueChange={(value) => handleSelectChange('targetAudience', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={getTranslation('targetAudience')} />
                      </SelectTrigger>
                      <SelectContent>
                        {targetAudiences.map((audience) => (
                          <SelectItem key={audience.value} value={audience.value}>
                            {audience.label[language]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contentLength">{getTranslation('contentLength')}</Label>
                    <Select
                      value={formData.contentLength}
                      onValueChange={(value) => handleSelectChange('contentLength', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={getTranslation('contentLength')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">{getTranslation('short')}</SelectItem>
                        <SelectItem value="medium">{getTranslation('medium')}</SelectItem>
                        <SelectItem value="long">{getTranslation('long')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instructions">{getTranslation('instructions')}</Label>
                  <Textarea
                    id="instructions"
                    name="instructions"
                    placeholder={getTranslation('instructionsPlaceholder')}
                    rows={4}
                    value={formData.instructions}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {getTranslation('creditsRemaining')}: <span className="font-semibold">85</span>
                </div>
                <Button 
                  onClick={handleGenerateContent} 
                  disabled={isGenerating || !formData.title || !formData.topic}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {getTranslation('generating')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      {getTranslation('generateContent')}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Credits & Publishing info */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{getTranslation('useCredits')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 text-blue-700 p-4 rounded-md">
                  <p className="font-medium">
                    {language === 'vi' 
                      ? 'Tạo bài viết này sẽ sử dụng 5 tín dụng' 
                      : 'Creating this content will use 5 credits'
                    }
                  </p>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{getTranslation('creditsRemaining')}</div>
                    <div className="text-2xl font-bold">85</div>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href="/dashboard/credits">
                        {language === 'vi' ? 'Mua thêm tín dụng' : 'Buy more credits'}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Editor (only shown after content is generated) */}
        {generatedContent && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {formData.title || (language === 'vi' ? 'Nội dung đã tạo' : 'Generated Content')}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <span>{getTranslation('seoScore')}:</span>
                    <span className="ml-1 font-bold">92/100</span>
                  </div>
                </div>
              </div>
              
              <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="editor">{getTranslation('editor')}</TabsTrigger>
                  <TabsTrigger value="preview">{getTranslation('preview')}</TabsTrigger>
                </TabsList>
              
                <TabsContent value="editor" className="space-y-4 mt-0">
                  <Textarea
                    className="min-h-[400px] font-mono"
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                  />
                </TabsContent>
              
                <TabsContent value="preview" className="mt-0">
                  <div 
                    className="border rounded-md p-6 min-h-[400px] prose prose-blue max-w-none"
                    dangerouslySetInnerHTML={{ __html: generatedContent }}
                  />
                </TabsContent>
              </Tabs>
            </CardHeader>
            
            <CardContent>
              {/* Intentionally empty - moved TabsContent inside the Tabs component */}
            </CardContent>
            
            <CardFooter className="flex flex-wrap gap-2 justify-between">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {getTranslation('saving')}
                    </>
                  ) : (
                    getTranslation('saveAsDraft')
                  )}
                </Button>
                
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  {getTranslation('downloadPDF')}
                </Button>
                
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  {language === 'vi' ? 'Chia sẻ' : 'Share'}
                </Button>
              </div>
              
              <div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={getTranslation('publishTo')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wordpress">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>{getTranslation('wordpress')}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="facebook">
                      <div className="flex items-center">
                        <Facebook className="mr-2 h-4 w-4" />
                        <span>{getTranslation('facebook')}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="twitter">
                      <div className="flex items-center">
                        <Twitter className="mr-2 h-4 w-4" />
                        <span>{getTranslation('twitter')}</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreateContent;
