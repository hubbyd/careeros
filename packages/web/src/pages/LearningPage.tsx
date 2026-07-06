import { useState } from 'react';
import { BookOpen, Plus, TrendingUp, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Tag } from '@/components/ui/Tag';
import { Layout } from '@/components/layout/Layout';
import { useLearningStore } from '@/stores/learning';
import { CAREER_DIRECTIONS, LEARNING_STATUSES } from '@aic/shared';

export function LearningPage() {
  const { generatePlan, getPlanById, updateProgress, addGrowthRecord, getGrowthRecords, isLoading, plans, currentPlan, growthRecords } = useLearningStore();
  const [targetJob, setTargetJob] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [studyTime, setStudyTime] = useState('');
  const [progress, setProgress] = useState(0);
  const [recordContent, setRecordContent] = useState('');

  const handleGeneratePlan = async () => {
    try {
      await generatePlan({ targetJob, currentLevel, studyTime });
    } catch {
    }
  };

  const handleSelectPlan = async (plan: typeof plans[0]) => {
    try {
      await getPlanById(plan.id);
      setProgress(plan.progress);
      await getGrowthRecords(plan.id);
    } catch {
    }
  };

  const handleUpdateProgress = async () => {
    if (!currentPlan) return;
    try {
      await updateProgress(currentPlan.id, progress);
    } catch {
    }
  };

  const handleAddRecord = async () => {
    if (!currentPlan || !recordContent) return;
    try {
      await addGrowthRecord({ planId: currentPlan.id, type: 'study', content: recordContent });
      setRecordContent('');
    } catch {
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">学习计划</h1>
            <p className="text-gray-500">AI定制化学习路线，高效提升技能</p>
          </div>
        </div>

        <Card>
          <h3 className="font-semibold text-gray-800 mb-4">生成学习计划</h3>
          <div className="space-y-4">
            <Select
              label="目标岗位"
              value={targetJob}
              onChange={(e) => setTargetJob(e.target.value)}
            >
              <option value="">请选择目标岗位</option>
              {CAREER_DIRECTIONS.map((dir: { value: string; label: string }) => (
              <option key={dir.value} value={dir.label}>
                {dir.label}
              </option>
            ))}
            </Select>
            <Select
              label="当前水平"
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value)}
            >
              <option value="">请选择当前水平</option>
              <option value="beginner">零基础</option>
              <option value="intermediate">有一定基础</option>
              <option value="advanced">有项目经验</option>
            </Select>
            <Select
              label="每日学习时间"
              value={studyTime}
              onChange={(e) => setStudyTime(e.target.value)}
            >
              <option value="">请选择每日学习时间</option>
              <option value="1-2">1-2小时</option>
              <option value="2-4">2-4小时</option>
              <option value="4-6">4-6小时</option>
              <option value="6+">6小时以上</option>
            </Select>
            <Button
              onClick={handleGeneratePlan}
              loading={isLoading}
              disabled={!targetJob || !currentLevel || !studyTime}
              className="w-full"
            >
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                生成计划
              </span>
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <h3 className="font-semibold text-gray-800 mb-4">我的计划</h3>
            {plans.length > 0 ? (
              <div className="space-y-3">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentPlan?.id === plan.id ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-gray-800 mb-1">{plan.title}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{plan.progress}%</span>
                      <Tag variant={plan.status === 'completed' ? 'success' : plan.status === 'active' ? 'primary' : 'warning'} size="sm">
                        {LEARNING_STATUSES.find((s: { value: string; label: string }) => s.value === plan.status)?.label}
                      </Tag>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <BookOpen className="w-8 h-8 mx-auto mb-2" />
                <p>暂无学习计划</p>
              </div>
            )}
          </Card>

          <Card className="lg:col-span-2">
            {currentPlan ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{currentPlan.title}</h3>
                    <Tag variant={currentPlan.status === 'completed' ? 'success' : currentPlan.status === 'active' ? 'primary' : 'warning'}>
                      {LEARNING_STATUSES.find((s: { value: string; label: string }) => s.value === currentPlan.status)?.label}
                    </Tag>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{currentPlan.description}</p>
                </div>

                <div>
                  <ProgressBar progress={currentPlan.progress} label="学习进度" />
                  <div className="mt-4 flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                    <span className="text-sm font-medium text-primary-600 w-12">{progress}%</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUpdateProgress}
                      loading={isLoading}
                    >
                      更新进度
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-3">计划内容</h4>
                  <div className="prose prose-sm max-w-none">
                    <div className="text-gray-700 whitespace-pre-wrap">{currentPlan.content}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-3">成长记录</h4>
                  <Textarea
                    placeholder="记录今天的学习内容..."
                    rows={3}
                    value={recordContent}
                    onChange={(e) => setRecordContent(e.target.value)}
                    className="mb-3"
                  />
                  <Button
                    variant="outline"
                    onClick={handleAddRecord}
                    loading={isLoading}
                    disabled={!recordContent}
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      添加记录
                    </span>
                  </Button>

                  {growthRecords.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {growthRecords.map((record) => (
                        <div key={record.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{new Date(record.completedAt).toLocaleString()}</span>
                          </div>
                          <p className="text-gray-700">{record.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <TrendingUp className="w-12 h-12 mb-4" />
                <p>选择一个学习计划查看详情</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
}