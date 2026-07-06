import { useState } from 'react';
import { MessageSquare, Play, ChevronRight, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Tag } from '@/components/ui/Tag';
import { Layout } from '@/components/layout/Layout';
import { useInterviewStore } from '@/stores/interview';
import { JOB_LEVELS, CAREER_DIRECTIONS, InterviewSession } from '@aic/shared';

export function InterviewPage() {
  const { createSession, getSessionQuestions, submitAnswer, getReport, isLoading, sessions, questions } = useInterviewStore();
  const [jobTitle, setJobTitle] = useState('');
  const [level, setLevel] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState('');
  const [currentSession, setCurrentSession] = useState<InterviewSession | null>(null);

  const handleStartInterview = async () => {
    try {
      const session = await createSession({ jobTitle, level });
      await getSessionQuestions(session.id);
      setCurrentQuestionIndex(0);
      setAnswer('');
    } catch {
    }
  };

  const handleSubmitAnswer = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    try {
      await submitAnswer(currentQuestion.id, answer);
      setAnswer('');
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowReport(true);
        if (currentSession) {
          const reportData = await getReport(currentSession.id);
          setReport(reportData);
        }
      }
    } catch {
    }
  };

  const handleViewSession = async (session: typeof sessions[0]) => {
    setCurrentSession(session);
    await getSessionQuestions(session.id);
    setCurrentQuestionIndex(0);
    setAnswer('');
  };

  const handleGenerateReport = async () => {
    if (!currentSession) return;
    try {
      const reportData = await getReport(currentSession.id);
      setReport(reportData);
      setShowReport(true);
    } catch {
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">模拟面试</h1>
            <p className="text-gray-500">AI面试官模拟真实面试场景，提升你的面试技巧</p>
          </div>
        </div>

        {!currentSession || showReport ? (
          <>
            <Card>
              <h3 className="font-semibold text-gray-800 mb-4">开始新面试</h3>
              <div className="space-y-4">
                <Select
                  label="目标岗位"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                >
                  <option value="">请选择目标岗位</option>
                  {CAREER_DIRECTIONS.map((dir: { value: string; label: string }) => (
                    <option key={dir.value} value={dir.label}>
                      {dir.label}
                    </option>
                  ))}
                </Select>
                <Select
                  label="职位级别"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="">请选择职位级别</option>
                  {JOB_LEVELS.map((l: { value: string; label: string }) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </Select>
                <Button
                  onClick={handleStartInterview}
                  loading={isLoading}
                  disabled={!jobTitle || !level}
                  className="w-full"
                >
                  <span className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    开始面试
                  </span>
                </Button>
              </div>
            </Card>

            {showReport && (
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">面试报告</h3>
                  <button onClick={() => setShowReport(false)} className="text-gray-500 hover:text-gray-700">
                    关闭
                  </button>
                </div>
                <div className="prose prose-sm max-w-none">
                  <div className="text-gray-700 whitespace-pre-wrap">{report}</div>
                </div>
              </Card>
            )}

            <Card>
              <h3 className="font-semibold text-gray-800 mb-4">面试记录</h3>
              {sessions.length > 0 ? (
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{session.jobTitle}</div>
                          <div className="text-sm text-gray-500">
                            {JOB_LEVELS.find((l: { value: string; label: string }) => l.value === session.level)?.label} | {new Date(session.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag variant={session.status === 'completed' ? 'success' : session.status === 'in_progress' ? 'warning' : 'info'}>
                          {session.status === 'completed' ? '已完成' : session.status === 'in_progress' ? '进行中' : '待开始'}
                        </Tag>
                        <button
                          onClick={() => handleViewSession(session)}
                          className="flex items-center gap-1 text-primary-600 hover:text-primary-700"
                        >
                          查看详情
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                  <p>暂无面试记录</p>
                </div>
              )}
            </Card>
          </>
        ) : (
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-gray-800">{currentSession.jobTitle} - 模拟面试</h3>
                <p className="text-sm text-gray-500">问题 {currentQuestionIndex + 1} / {questions.length}</p>
              </div>
              <Tag variant="warning">进行中</Tag>
            </div>

            <div className="space-y-6">
              {currentQuestion && (
                <>
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">面试问题</h4>
                    <p className="text-gray-700">{currentQuestion.question}</p>
                  </div>

                  <Textarea
                    label="你的回答"
                    placeholder="请输入你的回答..."
                    rows={6}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />

                  <Button
                    onClick={handleSubmitAnswer}
                    loading={isLoading}
                    className="w-full"
                  >
                    {currentQuestionIndex < questions.length - 1 ? '提交答案并继续' : '提交答案并结束'}
                  </Button>

                  {currentQuestion.answer && (
                    <div className="mt-6 space-y-3">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">你的回答</h4>
                        <p className="text-gray-700">{currentQuestion.answer}</p>
                      </div>
                      {currentQuestion.evaluation && (
                        <div className="p-4 bg-accent-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-gray-800">AI评价</h4>
                            {currentQuestion.score !== undefined && (
                              <span className="text-lg font-bold text-primary-600">{currentQuestion.score}分</span>
                            )}
                          </div>
                          <p className="text-gray-700">{currentQuestion.evaluation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <Button
              variant="outline"
              className="mt-6 w-full"
              onClick={handleGenerateReport}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                生成面试报告
              </span>
            </Button>
          </Card>
        )}
      </div>
    </Layout>
  );
}