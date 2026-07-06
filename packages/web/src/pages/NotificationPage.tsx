import { useEffect } from 'react';
import { Bell, CheckCircle, Trash2, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Layout } from '@/components/layout/Layout';
import { useNotificationStore } from '@/stores/notification';

export function NotificationPage() {
  const { notifications, isLoading, getNotifications, markAsRead, markAllAsRead, deleteNotification } = useNotificationStore();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return `${minutes}分钟前`;
      }
      return `${hours}小时前`;
    } else if (days === 1) {
      return '昨天';
    } else if (days < 7) {
      return `${days}天前`;
    }
    return date.toLocaleDateString('zh-CN');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'learning':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'assessment':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">消息通知</h1>
            <p className="text-gray-500">查看您的最新消息</p>
          </div>
          {notifications.length > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              全部标为已读
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : notifications.length === 0 ? (
          <Card className="text-center py-12">
            <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">暂无通知</h3>
            <p className="text-gray-400">您还没有收到任何通知</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`${notification.isRead ? 'bg-gray-50' : 'bg-white'} transition-colors`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className={`font-medium ${notification.isRead ? 'text-gray-600' : 'text-gray-800'}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                    <p className={`mt-1 text-sm ${notification.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                      {notification.content}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}