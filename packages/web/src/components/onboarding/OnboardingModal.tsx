import { useState } from 'react';
import { X, ArrowRight, Sparkles, Target, BookOpen, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface OnboardingModalProps {
  onComplete: () => void;
}

const steps = [
  {
    icon: Sparkles,
    title: '欢迎使用 CareerOS',
    description: 'AI驱动的职业成长操作系统，陪伴你每一天的成长旅程',
    color: 'bg-gradient-to-r from-primary-500 to-accent-500',
  },
  {
    icon: Target,
    title: '智能职业评估',
    description: '输入你的技能和背景，AI会为你分析竞争力，发现短板，推荐岗位',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
  },
  {
    icon: BookOpen,
    title: '个性化学习计划',
    description: '基于你的目标和当前水平，生成专属30天学习路线，每天提醒你进步',
    color: 'bg-gradient-to-r from-green-500 to-emerald-500',
  },
  {
    icon: MessageSquare,
    title: '模拟面试',
    description: 'AI面试官随时陪练，真实还原面试场景，给出专业评价和改进建议',
    color: 'bg-gradient-to-r from-pink-500 to-rose-500',
  },
];

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const current = steps[currentStep];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`${current.color} p-8 text-center text-white`}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
            <Icon className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-3">{current.title}</h2>
          <p className="text-white/80">{current.description}</p>
        </div>

        <div className="p-8">
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep ? 'bg-primary-600 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button className="w-full" onClick={handleNext}>
            {currentStep < steps.length - 1 ? (
              <>
                下一步
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                开始使用
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}