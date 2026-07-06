import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api/client';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await apiClient.post('/auth/forgot-password', { email });
      setMessage('重置链接已发送到您的邮箱');
    } catch {
      setError('发送失败，请检查邮箱是否正确');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => navigate('/login')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">忘记密码</h1>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="邮箱"
            type="email"
            placeholder="请输入您的邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" loading={isLoading} className="w-full">
            发送重置链接
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <button
            onClick={() => navigate('/login')}
            className="text-primary-600 hover:underline"
          >
            返回登录
          </button>
        </div>
      </Card>
    </div>
  );
}