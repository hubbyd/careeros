import { useNavigate } from 'react-router-dom';
import { Compass, FileText, MessageSquare, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Layout } from '@/components/layout/Layout';
import { useCareerStore } from '@/stores/career';
import { useResumeStore } from '@/stores/resume';
import { useInterviewStore } from '@/stores/interview';
import { useLearningStore } from '@/stores/learning';

const features = [
  {
    icon: Compass,
    title: '职业诊断',
    description: 'AI分析你的职业优势，找到最适合的发展方向',
    path: '/career',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: FileText,
    title: '简历优化',
    description: '智能解析简历，提供专业优化建议',
    path: '/resume',
    color: 'bg-accent-100 text-accent-600',
  },
  {
    icon: MessageSquare,
    title: '模拟面试',
    description: 'AI面试官模拟真实面试场景',
    path: '/interview',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: BookOpen,
    title: '学习计划',
    description: '定制化学习路线，高效提升技能',
    path: '/learning',
    color: 'bg-green-100 text-green-600',
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const { assessments } = useCareerStore();
  const { resumes } = useResumeStore();
  const { sessions } = useInterviewStore();
  const { plans } = useLearningStore();

  const stats = [
    { label: '职业评估', value: assessments.length, icon: Compass },
    { label: '简历分析', value: resumes.length, icon: FileText },
    { label: '模拟面试', value: sessions.length, icon: MessageSquare },
    { label: '学习计划', value: plans.length, icon: BookOpen },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 gradient-bg rounded-xl mb-4 animate-pulse-slow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            欢迎来到 <span className="gradient-text">AI职业教练</span>
          </h1>
          <p className="text-gray-500 text-lg">让AI助力你的职业发展，开启成功之路</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.label === '职业评估' ? 'text-primary-500' : stat.label === '简历分析' ? 'text-accent-500' : stat.label === '模拟面试' ? 'text-pink-500' : 'text-green-500'}`} />
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="gradient-bg rounded-card p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">开始你的职业之旅</h2>
                <p className="text-white/80">完成职业诊断，发现你的职业潜力</p>
              </div>
              <TrendingUp className="w-12 h-12 text-white/50" />
            </div>
            <Button variant="secondary" className="mt-6" onClick={() => navigate('/career')}>
              立即诊断
            </Button>
          </div>

          <Card padding="lg">
            <h3 className="font-semibold text-gray-800 mb-4">今日建议</h3>
            <div className="space-y-3">
              {assessments.length === 0 && (
                <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                  <Compass className="w-5 h-5 text-primary-500" />
                  <span className="text-sm text-gray-600">完成职业评估，了解你的职业优势</span>
                </div>
              )}
              {resumes.length === 0 && (
                <div className="flex items-center gap-3 p-3 bg-accent-50 rounded-lg">
                  <FileText className="w-5 h-5 text-accent-500" />
                  <span className="text-sm text-gray-600">上传简历，获取专业优化建议</span>
                </div>
              )}
              {sessions.length === 0 && (
                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-pink-500" />
                  <span className="text-sm text-gray-600">进行模拟面试，提升面试技巧</span>
                </div>
              )}
              {plans.length === 0 && (
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">生成学习计划，系统提升技能</span>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              hover
              onClick={() => navigate(feature.path)}
              className="cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}