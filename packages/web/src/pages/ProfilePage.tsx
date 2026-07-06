import { useState } from 'react';
import { User, Mail, Calendar, Settings, LogOut, TrendingUp, FileText, MessageSquare, BookOpen, Edit2, Check, X, Camera, Lock, Eye, EyeOff } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Layout } from '@/components/layout/Layout';
import { useAuthStore } from '@/stores/auth';
import { useCareerStore } from '@/stores/career';
import { useResumeStore } from '@/stores/resume';
import { useInterviewStore } from '@/stores/interview';
import { useLearningStore } from '@/stores/learning';
import { STORAGE_KEYS } from '@aic/shared';
import apiClient from '@/api/client';

export function ProfilePage() {
  const { user, logout, setUser } = useAuthStore();
  const { assessments } = useCareerStore();
  const { resumes } = useResumeStore();
  const { sessions } = useInterviewStore();
  const { plans } = useLearningStore();

  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = () => {
    logout();
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    window.location.href = '/login';
  };

  const handleEdit = () => {
    if (!isEditing) {
      setFormData({ username: user?.name || '', email: user?.email || '' });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const response = await apiClient.put('/auth/me', formData);
      setUser(response.data);
      setSuccess('资料更新成功');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('更新失败，请重试');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleChangePassword = async () => {
    try {
      await apiClient.post('/auth/me/change-password', passwordData);
      setSuccess('密码修改成功');
      setShowChangePassword(false);
      setPasswordData({ oldPassword: '', newPassword: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('密码修改失败，请检查原密码是否正确');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post('/auth/me/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(response.data);
      setSuccess('头像上传成功');
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('头像上传失败');
      setTimeout(() => setError(''), 3000);
    }
  };

  const stats = [
    { icon: TrendingUp, label: '职业评估', value: assessments.length, color: 'text-primary-500', bgColor: 'bg-primary-50' },
    { icon: FileText, label: '简历分析', value: resumes.length, color: 'text-accent-500', bgColor: 'bg-accent-50' },
    { icon: MessageSquare, label: '模拟面试', value: sessions.length, color: 'text-pink-500', bgColor: 'bg-pink-50' },
    { icon: BookOpen, label: '学习计划', value: plans.length, color: 'text-green-500', bgColor: 'bg-green-50' },
  ];

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12">
          <User className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-500">请先登录</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">用户中心</h1>
            <p className="text-gray-500">管理你的个人信息和学习进度</p>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-50 text-green-600 rounded-lg text-center">
            {success}
          </div>
        )}

        <Card className="flex items-center gap-6 p-6">
          <div className="relative">
            <div className="w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center overflow-hidden">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="头像" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-white" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-700">
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="用户名"
                />
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="邮箱"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave}>
                    <Check className="w-4 h-4 mr-2" />
                    保存
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleEdit}>
                    <X className="w-4 h-4 mr-2" />
                    取消
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <div className="flex items-center gap-4 mt-2 text-gray-500">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </>
            )}
          </div>
          {!isEditing && (
            <Button variant="outline" onClick={handleEdit}>
              <Edit2 className="w-4 h-4 mr-2" />
              编辑资料
            </Button>
          )}
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </Card>
          ))}
        </div>

        <Card>
          <h3 className="font-semibold text-gray-800 mb-4">账号设置</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">账号设置</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">修改邮箱</span>
              </div>
            </button>
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">修改密码</span>
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="text-red-600">退出登录</span>
              </div>
            </button>
          </div>

          {showChangePassword && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
              <h4 className="font-medium text-gray-700">修改密码</h4>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                  placeholder="原密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
              <div className="relative">
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="新密码"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
              <Button onClick={handleChangePassword}>确认修改</Button>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-800 mb-4">使用统计</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">注册时间</span>
              <span className="font-medium text-gray-800">{new Date(user.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">最后活跃</span>
              <span className="font-medium text-gray-800">{new Date(user.updatedAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">评估次数</span>
              <span className="font-medium text-gray-800">{assessments.length} 次</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">上传简历</span>
              <span className="font-medium text-gray-800">{resumes.length} 份</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}