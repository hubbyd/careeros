import { useState } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '@/api/client';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      setIsLoading(false);
      return;
    }

    if (!token) {
      setError('无效的重置链接');
      setIsLoading(false);
      return;
    }

    try {
      await apiClient.post('/auth/reset-password', { token, password });
      setMessage('密码重置成功，即将跳转到登录页面');
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setError('重置失败，请重新获取重置链接');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <div className="p-8">
            <Lock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h1 className="text-xl font-bold text-gray-800 mb-2">无效的重置链接</h1>
            <p className="text-gray-500 mb-6">请重新获取密码重置链接</p>
            <Button onClick={() => navigate('/forgot-password')}>
              返回获取重置链接
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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
          <h1 className="text-xl font-bold text-gray-800">重置密码</h1>
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
            label="新密码"
            type="password"
            placeholder="请输入新密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            label="确认密码"
            type="password"
            placeholder="请再次输入新密码"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" loading={isLoading} className="w-full">
            重置密码
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