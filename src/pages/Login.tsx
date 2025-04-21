
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginFormInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const { t } = useLanguage();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login attempted with:", data);
    // Actual login logic here...
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('login')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              {t('username')}
            </Label>
            <Input 
              id="username" 
              type="text" 
              autoComplete="username" 
              {...register('username', { required: t('usernameRequired') })}
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username && (
              <p role="alert" className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {t('password')}
            </Label>
            <Input 
              id="password" 
              type="password" 
              autoComplete="current-password" 
              {...register('password', { required: t('passwordRequired') })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p role="alert" className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <a href="/forgot-password" className="text-sm text-seo-blue hover:underline">
              {t('forgotPassword')}
            </a>
          </div>
          <Button type="submit" className="w-full" size="lg">
            {t('login')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
