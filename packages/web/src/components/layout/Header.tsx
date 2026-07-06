import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, Bell } from 'lucide-react';
import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notification';
import { APP_NAME, STORAGE_KEYS } from '@aic/shared';

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { unreadCount, getUnreadCount } = useNotificationStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      getUnreadCount();
    }
  }, [user, getUnreadCount]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    navigate('/login');
  };

  const navItems = [
    { label: '职业诊断', path: '/career' },
    { label: '简历优化', path: '/resume' },
    { label: '模拟面试', path: '/interview' },
    { label: '学习计划', path: '/learning' },
    { label: '用户中心', path: '/profile' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2" onClick={() => navigate('/')}>
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold gradient-text">{APP_NAME}</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/notifications')}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                  <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:inline text-gray-700 font-medium">{user.username}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-card shadow-card border border-gray-100 py-1 z-10">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      个人中心
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      退出登录
                    </button>
                  </div>
                )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-600 hover:text-primary-600 font-medium"
                >
                  登录
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 gradient-bg text-white rounded-full text-sm font-medium hover:opacity-90"
                >
                  注册
                </button>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg font-medium"
                >
                  {item.label}
                </button>
              ))}
              {!user && (
                <div className="flex flex-col gap-2 mt-4 px-4">
                  <button
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="py-2 text-gray-600 font-medium"
                  >
                    登录
                  </button>
                  <button
                    onClick={() => {
                      navigate('/register');
                      setMobileMenuOpen(false);
                    }}
                    className="py-2 gradient-bg text-white rounded-full text-sm font-medium"
                  >
                    注册
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
      {children}
    </header>
  );
}