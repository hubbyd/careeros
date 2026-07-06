import { useEffect, useState, useRef } from 'react';
import { MessageCircle, Plus, Trash2, Send, Bot } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Layout } from '@/components/layout/Layout';
import { useAiChatStore } from '@/stores/ai-chat';

export function AiChatPage() {
  const {
    sessions,
    currentSession,
    messages,
    isLoading,
    isTyping,
    createSession,
    getSessions,
    getMessages,
    sendMessage,
    deleteSession,
    setCurrentSession,
  } = useAiChatStore();

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getSessions();
  }, [getSessions]);

  useEffect(() => {
    if (currentSession) {
      getMessages(currentSession.id);
    }
  }, [currentSession, getMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCreateSession = async () => {
    await createSession();
    setInputValue('');
  };

  const handleSelectSession = (session: typeof sessions[0]) => {
    setCurrentSession(session);
    setInputValue('');
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !currentSession) return;
    await sendMessage(currentSession.id, inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-64px)] flex flex-col lg:flex-row">
        <div className="w-full lg:w-80 border-r border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary-600" />
                AI导师
              </h2>
              <Button variant="outline" size="sm" onClick={handleCreateSession} className="gap-1">
                <Plus className="w-4 h-4" />
                新建会话
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : sessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <MessageCircle className="w-12 h-12 mb-3" />
                <p>暂无会话</p>
                <Button variant="outline" size="sm" onClick={handleCreateSession} className="mt-4">
                  开始对话
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => handleSelectSession(session)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                      currentSession?.id === session.id ? 'bg-primary-50 border-l-2 border-primary-600' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 text-sm">AI导师</div>
                          <div className="text-xs text-gray-500 truncate">
                            {session.AiChatMessage?.[0]?.content || '新对话'}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {currentSession ? (
            <>
              <div className="p-4 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">AI导师</h3>
                    <p className="text-xs text-gray-500">智能职业成长助手</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Bot className="w-16 h-16 mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">欢迎与AI导师对话</h3>
                    <p className="text-sm">您可以咨询职业发展、学习规划、技术问题等</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                        message.role === 'user' ? 'gradient-bg' : 'bg-gray-200'
                      }`}>
                        {message.role === 'user' ? (
                          <span className="text-white text-xs font-medium">我</span>
                        ) : (
                          <Bot className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div className={`max-w-[70%] ${message.role === 'user' ? 'text-right' : ''}`}>
                        <Card className={`${message.role === 'user' ? 'bg-primary-600 text-white' : ''}`}>
                          <p className={`text-sm ${message.role === 'user' ? 'text-white' : 'text-gray-700'}`}>
                            {message.content}
                          </p>
                        </Card>
                        <span className="text-xs text-gray-400 mt-1 block">
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))
                )}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <Card className="bg-white">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      </div>
                    </Card>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex gap-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="输入您的问题..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputValue.trim()} className="gap-2">
                    <Send className="w-4 h-4" />
                    发送
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                <p>请选择或创建一个会话</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}