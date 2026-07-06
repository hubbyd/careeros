import { useState, useEffect } from 'react';
import { Users, TrendingUp, Settings, ChevronLeft, ChevronRight, Search, RefreshCw, Trash2, Edit } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Layout } from '@/components/layout/Layout';
import apiClient from '@/api/client';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface PageData {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
}

export function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('pageSize', pageSize.toString());
      if (searchTerm) {
        params.set('search', searchTerm);
      }

      const response = await apiClient.get<PageData>(`/admin/users?${params}`);
      setUsers(response.data.users);
      setTotal(response.data.total);
    } catch {
      setError('获取用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(total / pageSize);
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleSearch = () => {
    setPage(1);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('确定要删除该用户吗？')) {
      return;
    }

    try {
      await apiClient.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch {
      setError('删除用户失败');
    }
  };

  const handleRoleChange = async (id: number, role: string) => {
    try {
      await apiClient.put(`/admin/users/${id}/role`, { role });
      fetchUsers();
    } catch {
      setError('更新角色失败');
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">运营管理后台</h1>
            <p className="text-gray-500">管理平台用户和数据</p>
          </div>
          <Button onClick={fetchUsers} loading={loading}>
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">总用户数</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{total}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">当前页数</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{page}/{totalPages}</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">每页显示</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{pageSize}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">用户管理</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索用户..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">用户名</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">邮箱</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">角色</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">注册时间</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{user.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-gray-800">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="user">普通用户</option>
                        <option value="admin">管理员</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500">
              共 {total} 条记录，显示第 {((page - 1) * pageSize) + 1} - {Math.min(page * pageSize, total)} 条
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={page === 1 || loading}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="px-4 py-2 text-sm text-gray-600">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={page === totalPages || loading}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}