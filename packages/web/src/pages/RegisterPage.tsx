import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores/auth';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading, error, user } = useAuthStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('两次输入的密码不一致');
      return;
    }

    setPasswordError('');

    try {
      await register(username, email, password);
      setTimeout(() => navigate('/'), 500);
    } catch {
      setPasswordError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-bg rounded-2xl mb-4">
            <span className="text-white text-2xl font-bold">AI</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">AI职业教练</h1>
          <p className="text-gray-500">开启你的职业成长之旅</p>
        </div>

        <div className="bg-white rounded-card shadow-card p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">注册账号</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-card text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="用户名"
              type="text"
              placeholder="请输入用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full"
            />

            <Input
              label="邮箱"
              type="email"
              placeholder="请输入邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />

            <Input
              label="密码"
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />

            <Input
              label="确认密码"
              type="password"
              placeholder="请再次输入密码"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={passwordError}
              className="w-full"
            />

            <Button type="submit" loading={isLoading} className="w-full">
              <span className="flex items-center gap-2">
                注册
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              已有账号？{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                立即登录
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <User className="w-4 h-4" />
            <span>用户名唯一</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Lock className="w-4 h-4" />
            <span>密码加密存储</span>
          </div>
        </div>
      </div>
    </div>
  );
}