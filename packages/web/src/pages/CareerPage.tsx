import { useState } from 'react';
import { Sparkles, Target, Trophy, Code2, BarChart3, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Layout } from '@/components/layout/Layout';
import { useCareerStore } from '@/stores/career';
import { CAREER_DIRECTIONS, JOB_LEVELS } from '@aic/shared';

export function CareerPage() {
  const {
    smartAssessment,
    generateThirtyDayPlan,
    getProjectRecommendations,
    getLeetCodeRecommendations,
    getCompetitivenessIndex,
    predictOfferProbability,
    isLoading,
  } = useCareerStore();

  const [activeTab, setActiveTab] = useState<'smart' | 'thirtyDay' | 'project' | 'leetcode' | 'competitiveness' | 'offer'>('smart');
  const [result, setResult] = useState('');
  const [isJsonResult, setIsJsonResult] = useState(false);
  const [jsonData, setJsonData] = useState<any>(null);

  const [userInput, setUserInput] = useState('');
  const [targetJob, setTargetJob] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [skills, setSkills] = useState('');
  const [weaknesses, setWeaknesses] = useState('');
  const [major, setMajor] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [certifications, setCertifications] = useState('');
  const [competition, setCompetition] = useState('');
  const [projects, setProjects] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');

  const tabs = [
    { id: 'smart', label: '智能评估', icon: Sparkles },
    { id: 'thirtyDay', label: '30天计划', icon: Target },
    { id: 'project', label: '项目推荐', icon: Trophy },
    { id: 'leetcode', label: 'LeetCode', icon: Code2 },
    { id: 'competitiveness', label: '竞争力', icon: BarChart3 },
    { id: 'offer', label: 'Offer预测', icon: Briefcase },
  ];

  const parseResult = (data: string) => {
    try {
      const jsonMatch = data.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setIsJsonResult(true);
        setJsonData(parsed);
        return;
      }
    } catch {
    }
    setIsJsonResult(false);
    setJsonData(null);
  };

  const handleSmartAssessment = async () => {
    try {
      const resultData = await smartAssessment({ userInput });
      setResult(resultData);
      parseResult(resultData);
    } catch {
    }
  };

  const handleThirtyDayPlan = async () => {
    try {
      const resultData = await generateThirtyDayPlan({ targetJob, currentLevel, skills, weaknesses });
      setResult(resultData);
      parseResult(resultData);
    } catch {
    }
  };

  const handleProjectRecommendations = async () => {
    try {
      const resultData = await getProjectRecommendations({ major, skills, targetJob, currentLevel });
      setResult(resultData);
      parseResult(resultData);
    } catch {
    }
  };

  const handleLeetCodeRecommendations = async () => {
    try {
      const resultData = await getLeetCodeRecommendations({ targetJob, skills, weaknesses, currentLevel });
      setResult(resultData);
      parseResult(resultData);
    } catch {
    }
  };

  const handleCompetitivenessIndex = async () => {
    try {
      const resultData = await getCompetitivenessIndex({ major, skills, education, experience, certifications, competition, projects, targetJob });
      setResult(resultData);
      parseResult(resultData);
    } catch {
    }
  };

  const handleOfferProbability = async () => {
    try {
      const resultData = await predictOfferProbability({ major, skills, education, experience, targetJob, companyType, expectedSalary, currentLevel });
      setResult(resultData);
      parseResult(resultData);
    } catch {
    }
  };

  const renderRadarChart = (data: any) => {
    if (!data?.radarData) return null;
    const { labels, values, maxValues } = data.radarData;
    const points = labels.map((_: string, i: number) => {
      const angle = (i * 2 * Math.PI) / labels.length - Math.PI / 2;
      const radius = (values[i] / maxValues[i]) * 80;
      return `${50 + radius * Math.cos(angle)},${50 + radius * Math.sin(angle)}`;
    }).join(' ');

    const gridLines = labels.map((_: string, i: number) => {
      const angle = (i * 2 * Math.PI) / labels.length - Math.PI / 2;
      return `M 50,50 L ${50 + 80 * Math.cos(angle)},${50 + 80 * Math.sin(angle)}`;
    }).join(' ');

    return (
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 200 200" className="w-64 h-64">
          {[20, 40, 60, 80].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#e5e7eb" strokeWidth="1" />
          ))}
          <path d={gridLines} fill="none" stroke="#e5e7eb" strokeWidth="1" />
          <polygon
            points={points}
            fill="rgba(99, 102, 241, 0.3)"
            stroke="#6366f1"
            strokeWidth="2"
          />
          {labels.map((label: string, i: number) => {
            const angle = (i * 2 * Math.PI) / labels.length - Math.PI / 2;
            const radius = 95;
            const x = 100 + radius * Math.cos(angle);
            const y = 100 + radius * Math.sin(angle);
            return (
              <text
                key={label}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-gray-600"
              >
                {label}
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderCompetitivenessResult = (data: any) => {
    if (!data) return null;
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">{data.competitivenessScore}</div>
          <div className="text-lg text-gray-600">竞争力指数</div>
          <div className="text-sm text-gray-500">评级：{data.competitivenessLevel}</div>
        </div>
        {renderRadarChart(data)}
        {data.analysis && (
          <div className="space-y-4">
            {data.analysis.strengths && data.analysis.strengths.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-600 mb-2">优势</h4>
                <ul className="list-disc list-inside space-y-1">
                  {data.analysis.strengths.map((s: string, i: number) => (
                    <li key={i} className="text-gray-700">{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.analysis.weaknesses && data.analysis.weaknesses.length > 0 && (
              <div>
                <h4 className="font-semibold text-red-600 mb-2">薄弱环节</h4>
                <ul className="list-disc list-inside space-y-1">
                  {data.analysis.weaknesses.map((w: string, i: number) => (
                    <li key={i} className="text-gray-700">{w}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.analysis.suggestions && data.analysis.suggestions.length > 0 && (
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">改进建议</h4>
                <ul className="list-disc list-inside space-y-1">
                  {data.analysis.suggestions.map((s: string, i: number) => (
                    <li key={i} className="text-gray-700">{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {data.improvementPlan && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">提升计划</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">短期</span>
                <span className="text-gray-700">{data.improvementPlan.shortTerm}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">中期</span>
                <span className="text-gray-700">{data.improvementPlan.mediumTerm}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">长期</span>
                <span className="text-gray-700">{data.improvementPlan.longTerm}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderOfferProbabilityResult = (data: any) => {
    if (!data) return null;
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-5xl font-bold text-primary-600 mb-2">{data.overallProbability}%</div>
          <div className="text-lg text-gray-600">Offer概率</div>
          <div className="text-sm text-gray-500">评级：{data.probabilityLevel}</div>
        </div>
        {data.breakdown && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">能力细分</h4>
            <div className="space-y-3">
              {Object.entries(data.breakdown).map(([key, value]) => {
                const numValue = value as number;
                return (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{key === 'technicalAbility' ? '技术能力' : key === 'projectExperience' ? '项目经验' : key === 'algorithmSkill' ? '算法能力' : key === 'communicationSkill' ? '沟通能力' : '文化契合'}</span>
                      <span className="font-medium text-gray-800">{numValue}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" style={{ width: `${numValue}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {data.analysis && (
          <div className="space-y-4">
            {data.analysis.factors && data.analysis.factors.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">影响因素</h4>
                <div className="flex flex-wrap gap-2">
                  {data.analysis.factors.map((f: string, i: number) => (
                    <span key={i} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            )}
            {data.analysis.risks && data.analysis.risks.length > 0 && (
              <div>
                <h4 className="font-semibold text-red-600 mb-2">风险提示</h4>
                <ul className="list-disc list-inside space-y-1">
                  {data.analysis.risks.map((r: string, i: number) => (
                    <li key={i} className="text-gray-700">{r}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.analysis.opportunities && data.analysis.opportunities.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-600 mb-2">机会点</h4>
                <ul className="list-disc list-inside space-y-1">
                  {data.analysis.opportunities.map((o: string, i: number) => (
                    <li key={i} className="text-gray-700">{o}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {data.suggestions && data.suggestions.length > 0 && (
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">提升建议</h4>
            <ul className="list-disc list-inside space-y-1">
              {data.suggestions.map((s: string, i: number) => (
                <li key={i} className="text-gray-700">{s}</li>
              ))}
            </ul>
          </div>
        )}
        {data.targetCompanies && data.targetCompanies.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">目标公司建议</h4>
            <div className="space-y-3">
              {data.targetCompanies.map((c: { name: string; probability: number; reason: string }, i: number) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-800">{c.name}</span>
                    <span className="text-primary-600 font-bold">{c.probability}%</span>
                  </div>
                  <div className="text-sm text-gray-500">{c.reason}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">职业诊断</h1>
            <p className="text-gray-500">AI助力你的职业发展规划</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                setResult('');
                setIsJsonResult(false);
                setJsonData(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'gradient-bg text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            {activeTab === 'smart' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">智能综合评估</h3>
                <p className="text-sm text-gray-500">请用自然语言描述你的背景和能力，AI将为你进行全面评估</p>
                <Textarea
                  label="个人信息"
                  placeholder="例如：我是软件工程专业，会Java、Python、SpringBoot，不会算法，不会Vue、React，四六级已过，拿过蓝桥杯..."
                  rows={8}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <Button onClick={handleSmartAssessment} loading={isLoading} className="w-full">
                  开始评估
                </Button>
              </div>
            )}

            {activeTab === 'thirtyDay' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">30天学习计划</h3>
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
                  {JOB_LEVELS.map((level: { value: string; label: string }) => (
                    <option key={level.value} value={level.label}>
                      {level.label}
                    </option>
                  ))}
                </Select>
                <Textarea
                  label="已有技能"
                  placeholder="例如：Java, SpringBoot, MySQL, Redis..."
                  rows={2}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
                <Textarea
                  label="短板/薄弱环节"
                  placeholder="例如：算法, Vue, React..."
                  rows={2}
                  value={weaknesses}
                  onChange={(e) => setWeaknesses(e.target.value)}
                />
                <Button onClick={handleThirtyDayPlan} loading={isLoading} className="w-full">
                  生成30天计划
                </Button>
              </div>
            )}

            {activeTab === 'project' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">项目与比赛推荐</h3>
                <Textarea
                  label="专业"
                  placeholder="例如：软件工程"
                  rows={1}
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
                <Textarea
                  label="技能"
                  placeholder="例如：Java, SpringBoot, Python..."
                  rows={2}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
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
                  {JOB_LEVELS.map((level: { value: string; label: string }) => (
                    <option key={level.value} value={level.label}>
                      {level.label}
                    </option>
                  ))}
                </Select>
                <Button onClick={handleProjectRecommendations} loading={isLoading} className="w-full">
                  获取推荐
                </Button>
              </div>
            )}

            {activeTab === 'leetcode' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">LeetCode题目推荐</h3>
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
                <Textarea
                  label="已有技能"
                  placeholder="例如：Java, Python..."
                  rows={2}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
                <Textarea
                  label="薄弱环节"
                  placeholder="例如：动态规划, 图论..."
                  rows={2}
                  value={weaknesses}
                  onChange={(e) => setWeaknesses(e.target.value)}
                />
                <Select
                  label="当前水平"
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value)}
                >
                  <option value="">请选择当前水平</option>
                  {JOB_LEVELS.map((level: { value: string; label: string }) => (
                    <option key={level.value} value={level.label}>
                      {level.label}
                    </option>
                  ))}
                </Select>
                <Button onClick={handleLeetCodeRecommendations} loading={isLoading} className="w-full">
                  获取推荐
                </Button>
              </div>
            )}

            {activeTab === 'competitiveness' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">竞争力指数与雷达图</h3>
                <Textarea
                  label="专业"
                  placeholder="例如：软件工程"
                  rows={1}
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
                <Textarea
                  label="技能"
                  placeholder="例如：Java, SpringBoot, MySQL..."
                  rows={2}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
                <Textarea
                  label="学历"
                  placeholder="例如：本科"
                  rows={1}
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
                <Textarea
                  label="工作经验"
                  placeholder="例如：2年"
                  rows={1}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
                <Textarea
                  label="证书"
                  placeholder="例如：四六级, 计算机二级..."
                  rows={1}
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                />
                <Textarea
                  label="比赛经历"
                  placeholder="例如：蓝桥杯省二..."
                  rows={1}
                  value={competition}
                  onChange={(e) => setCompetition(e.target.value)}
                />
                <Textarea
                  label="项目经验"
                  placeholder="例如：电商系统开发..."
                  rows={1}
                  value={projects}
                  onChange={(e) => setProjects(e.target.value)}
                />
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
                <Button onClick={handleCompetitivenessIndex} loading={isLoading} className="w-full">
                  生成竞争力指数
                </Button>
              </div>
            )}

            {activeTab === 'offer' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Offer概率预测</h3>
                <Textarea
                  label="专业"
                  placeholder="例如：软件工程"
                  rows={1}
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
                <Textarea
                  label="技能"
                  placeholder="例如：Java, SpringBoot, MySQL..."
                  rows={2}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
                <Textarea
                  label="学历"
                  placeholder="例如：本科"
                  rows={1}
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
                <Textarea
                  label="工作经验"
                  placeholder="例如：2年"
                  rows={1}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
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
                  label="目标公司类型"
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value)}
                >
                  <option value="">请选择公司类型</option>
                  <option value="大厂">大厂</option>
                  <option value="中型互联网公司">中型互联网公司</option>
                  <option value="创业公司">创业公司</option>
                  <option value="外企">外企</option>
                </Select>
                <Input
                  label="期望薪资"
                  placeholder="例如：15k"
                  value={expectedSalary}
                  onChange={(e) => setExpectedSalary(e.target.value)}
                />
                <Select
                  label="当前水平"
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value)}
                >
                  <option value="">请选择当前水平</option>
                  {JOB_LEVELS.map((level: { value: string; label: string }) => (
                    <option key={level.value} value={level.label}>
                      {level.label}
                    </option>
                  ))}
                </Select>
                <Button onClick={handleOfferProbability} loading={isLoading} className="w-full">
                  预测Offer概率
                </Button>
              </div>
            )}
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-800 mb-4">分析结果</h3>
            {result ? (
              <div className="prose prose-sm max-w-none">
                {isJsonResult && activeTab === 'competitiveness' && jsonData ? (
                  renderCompetitivenessResult(jsonData)
                ) : isJsonResult && activeTab === 'offer' && jsonData ? (
                  renderOfferProbabilityResult(jsonData)
                ) : (
                  <div className="text-gray-700 whitespace-pre-wrap">{result}</div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Sparkles className="w-12 h-12 mb-4" />
                <p>点击上方按钮开始分析</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
}