import { useState } from 'react';
import { FileText, Upload, Trash2, Play, Eye } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Layout } from '@/components/layout/Layout';
import { useResumeStore } from '@/stores/resume';

export function ResumePage() {
  const { uploadResume, getResumes, analyzeResume, deleteResume, isLoading, resumes, currentResume } = useResumeStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      await uploadResume(selectedFile);
      setSelectedFile(null);
      await getResumes();
    } catch {
    }
  };

  const handleAnalyze = async (id: number) => {
    try {
      await analyzeResume(id);
      setShowAnalysis(true);
    } catch {
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这份简历吗？')) return;
    try {
      await deleteResume(id);
    } catch {
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">简历优化</h1>
            <p className="text-gray-500">AI智能解析简历，提供专业优化建议</p>
          </div>
        </div>

        <Card className="border-2 border-dashed border-primary-200 hover:border-primary-400 transition-colors">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">上传简历</h3>
            <p className="text-gray-500 text-sm mb-6">支持PDF、DOCX格式，最大10MB</p>
            
            <input
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-full cursor-pointer hover:opacity-90 transition-opacity"
            >
              <Upload className="w-5 h-5" />
              选择文件
            </label>

            {selectedFile && (
              <div className="mt-4 flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary-500" />
                <span className="text-gray-700">{selectedFile.name}</span>
                <Button variant="outline" size="sm" onClick={() => setSelectedFile(null)}>
                  取消
                </Button>
              </div>
            )}

            {selectedFile && (
              <Button
                onClick={handleUpload}
                loading={isLoading}
                className="mt-4"
              >
                上传并分析
              </Button>
            )}
          </div>
        </Card>

        {showAnalysis && currentResume?.analysisResult && (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">分析结果</h3>
              <button onClick={() => setShowAnalysis(false)} className="text-gray-500 hover:text-gray-700">
                关闭
              </button>
            </div>
            <div className="prose prose-sm max-w-none">
              <div className="text-gray-700 whitespace-pre-wrap">{currentResume.analysisResult}</div>
            </div>
          </Card>
        )}

        <Card>
          <h3 className="font-semibold text-gray-800 mb-4">简历列表</h3>
          {resumes.length > 0 ? (
            <div className="space-y-3">
              {resumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{resume.fileName}</div>
                      <div className="text-sm text-gray-500">{new Date(resume.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!resume.analysisResult && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAnalyze(resume.id)}
                        loading={isLoading}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        分析
                      </Button>
                    )}
                    {resume.analysisResult && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setShowAnalysis(true)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        查看分析
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(resume.id)}
                      className="text-red-500 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <FileText className="w-8 h-8 mx-auto mb-2" />
              <p>暂无简历记录</p>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}