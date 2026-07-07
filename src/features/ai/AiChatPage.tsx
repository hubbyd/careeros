import { useState, useEffect, useRef } from 'react'
import { aiApi } from '../../api'
import Button from '../../components/Button/Button'
import { AiIcon, TargetIcon, FileIcon, MessageIcon, BookIcon, SendIcon, SettingsIcon, ChevronDownIcon } from '../../components/Icons'
import styles from './AiChatPage.module.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Model {
  name: string
  provider: string
  model: string
  baseUrl?: string
  description: string
  free: boolean
  freeTier: boolean
  signUpUrl: string
}

const quickQuestions = [
  { label: '如何准备前端面试？', category: 'interview' },
  { label: 'React和Vue哪个更适合我？', category: 'career' },
  { label: '简历怎么写才能通过筛选？', category: 'resume' },
  { label: '算法刷题有什么技巧？', category: 'study' },
  { label: '如何提升代码能力？', category: 'skill' },
]

export default function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeCategory, setActiveCategory] = useState('career')
  const [models, setModels] = useState<Model[]>([])
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [showModelSelector, setShowModelSelector] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    aiApi.models().then(data => {
      setModels(data)
      if (data.length > 0) {
        setSelectedModel(data[0])
      }
    }).catch(() => {})
  }, [])

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: '你好！我是你的AI求职助手。我可以帮你解答职业规划、简历优化、面试准备等方面的问题。请问有什么我可以帮你的？',
        timestamp: new Date()
      }])
    }
  }, [])

  const handleSend = async (messageContent?: string) => {
    const content = messageContent || inputValue.trim()
    if (!content || isTyping) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      if (selectedModel) {
        const response = await aiApi.chatStream([...messages.map(m => ({ role: m.role, content: m.content })), { role: 'user', content }], selectedModel)
        
        if (!response.ok) {
          throw new Error('AI服务调用失败')
        }

        const reader = response.body?.getReader()
        if (!reader) {
          throw new Error('无法获取响应流')
        }

        const decoder = new TextDecoder()
        let buffer = ''
        let responseContent = ''
        
        const assistantMessageId = (Date.now() + 1).toString()
        setMessages(prev => [...prev, {
          id: assistantMessageId,
          role: 'assistant',
          content: '',
          timestamp: new Date()
        }])

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') {
                setIsTyping(false)
                if (!responseContent) {
                  setMessages(prev => prev.map(m => 
                    m.id === assistantMessageId 
                      ? { ...m, content: 'AI暂时无法回答，请稍后再试。' }
                      : m
                  ))
                }
                return
              }

              try {
                const json = JSON.parse(data)
                const content = json.content || json.choices?.[0]?.delta?.content
                if (content) {
                  responseContent += content
                  setMessages(prev => prev.map(m => 
                    m.id === assistantMessageId 
                      ? { ...m, content: responseContent }
                      : m
                  ))
                } else if (json.error) {
                  const errorMsg = typeof json.error === 'string' ? json.error : json.error.message || '未知错误'
                  setMessages(prev => prev.map(m => 
                    m.id === assistantMessageId 
                      ? { ...m, content: `错误: ${errorMsg}` }
                      : m
                  ))
                  setIsTyping(false)
                  return
                }
              } catch {}
            }
          }
        }
        
        setIsTyping(false)
        if (!responseContent) {
          setMessages(prev => prev.map(m => 
            m.id === assistantMessageId 
              ? { ...m, content: 'AI暂时无法回答，请稍后再试。' }
              : m
          ))
        }
        return
      }

      const fallbackContent = getFallbackResponse(content, activeCategory)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackContent,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch {
      const fallbackContent = getFallbackResponse(content, activeCategory)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `AI服务暂时不可用，为你提供基础建议：\n\n${fallbackContent}`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  function getFallbackResponse(content: string, category: string): string {
    const responses: Record<string, string[]> = {
      career: [
        '职业规划建议：\n\n1. 明确你的兴趣和优势\n2. 了解目标行业的发展趋势\n3. 制定短期和长期目标\n4. 持续学习和提升技能\n\n如果你能告诉我你的专业、技能和兴趣，我可以为你提供更详细的职业建议。',
        '选择职业方向时，建议考虑：\n\n1. 市场需求和前景\n2. 个人兴趣和能力\n3. 行业发展趋势\n4. 薪资待遇和成长空间\n\n常见的IT职业方向包括：前端开发、后端开发、算法工程师、产品经理等。',
      ],
      resume: [
        '简历优化建议：\n\n1. 使用STAR法则描述经历\n2. 突出量化成果（用数字说话）\n3. 匹配目标岗位关键词\n4. 保持简洁，控制在一页以内\n5. 使用专业术语\n\n建议结构：基本信息 → 教育背景 → 工作/实习经历 → 项目经验 → 技能清单 → 获奖情况',
        '简历写作技巧：\n\n1. 关键词匹配：仔细阅读JD，提取关键词\n2. 成果导向：强调你做了什么，取得了什么成果\n3. 格式规范：使用清晰的标题和项目符号\n4. 真实可信：不要夸大或虚构经历\n\n如果你能提供简历内容，我可以帮你分析并给出具体的优化建议。',
      ],
      interview: [
        '面试准备建议：\n\n1. 技术基础：复习数据结构、算法、网络协议等\n2. 项目经历：准备2-3个重点项目的详细介绍\n3. 行为面试：准备常见的行为问题（STAR法则）\n4. 公司研究：了解公司业务和文化\n5. 模拟练习：进行模拟面试提升表达能力\n\n常见面试问题包括：\n- 技术基础（HTML/CSS/JS/框架原理）\n- 算法与数据结构\n- 项目经历深挖\n- 系统设计\n- 行为面试题',
        '技术面试技巧：\n\n1. 听清问题：确认理解问题后再回答\n2. 思路清晰：先讲思路再写代码\n3. 代码规范：注意命名和代码结构\n4. 测试用例：考虑边界情况\n5. 沟通交流：保持与面试官的互动\n\n建议提前刷LeetCode、复习基础知识、准备项目亮点。',
      ],
      study: [
        '学习建议：\n\n1. 建立学习计划：制定明确的目标和时间表\n2. 理论与实践结合：通过项目实践巩固知识\n3. 多做笔记：记录重点和难点\n4. 定期复盘：总结学习成果和不足\n5. 保持耐心：技术学习是长期积累的过程\n\n推荐学习资源：官方文档、技术博客、在线课程、开源项目',
        '编程能力提升：\n\n1. 算法刷题：LeetCode、牛客网等平台\n2. 开源贡献：参与开源项目学习优秀代码\n3. 技术博客：记录学习心得和技术分享\n4. 技术交流：参加技术社区和分享会\n5. 代码审查：学习他人代码并接受反馈\n\n建议每周保持一定的代码量，持续学习新技术。',
      ],
    }

    const categoryResponses = responses[category] || responses.study
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
  }

  const handleQuickQuestion = (question: string) => {
    handleSend(question)
  }

  const categories = [
    { id: 'career', label: '职业规划', icon: <TargetIcon size={18} /> },
    { id: 'resume', label: '简历优化', icon: <FileIcon size={18} /> },
    { id: 'interview', label: '面试准备', icon: <MessageIcon size={18} /> },
    { id: 'study', label: '学习建议', icon: <BookIcon size={18} /> },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.botAvatar}>
            <AiIcon size={28} />
          </div>
          <div className={styles.botInfo}>
            <h1 className={styles.botName}>AI求职助手</h1>
            <p className={styles.botDesc}>你的智能求职顾问</p>
          </div>
        </div>
        
        <div className={styles.modelSelector}>
          <button 
            className={styles.modelBtn}
            onClick={() => setShowModelSelector(!showModelSelector)}
          >
            <SettingsIcon size={18} />
            <span className={styles.modelName}>{selectedModel?.name || '选择模型'}</span>
            <ChevronDownIcon size={16} className={styles.modelArrow} />
          </button>
          
          {showModelSelector && (
            <div className={styles.modelDropdown}>
              <p className={styles.dropdownTitle}>选择AI模型</p>
              {models.length === 0 ? (
                <p className={styles.noModels}>暂无可用模型</p>
              ) : (
                models.map((model, index) => (
                  <button
                    key={index}
                    className={`${styles.modelOption} ${selectedModel?.name === model.name ? styles.selected : ''}`}
                    onClick={() => {
                      setSelectedModel(model)
                      setShowModelSelector(false)
                    }}
                  >
                    <span className={styles.modelOptionName}>
                      {model.name}
                      {model.freeTier && <span className={styles.freeBadge}>免费额度</span>}
                    </span>
                    <span className={styles.modelOptionDesc}>{model.description}</span>
                    {model.freeTier && (
                      <span className={styles.modelSignUp}>
                        <a href={model.signUpUrl} target="_blank" rel="noopener noreferrer">
                          获取API密钥 →
                        </a>
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.categoryActive : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className={styles.categoryIcon}>{cat.icon}</span>
            <span className={styles.categoryLabel}>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.quickQuestions}>
        <p className={styles.quickTitle}>快速提问</p>
        <div className={styles.quickGrid}>
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              className={styles.quickBtn}
              onClick={() => handleQuickQuestion(q.label)}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map(msg => (
            <div key={msg.id} className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.assistantMessage}`}>
              <div className={`${styles.avatar} ${msg.role === 'user' ? styles.userAvatar : styles.botChatAvatar}`}>
                {msg.role === 'user' ? (
                  <span className={styles.userAvatarInner}>👤</span>
                ) : (
                  <AiIcon size={16} />
                )}
              </div>
              <div className={styles.messageContent}>
                <p className={styles.text}>{msg.content}</p>
                <span className={styles.time}>{msg.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={styles.message}>
              <div className={styles.botChatAvatar}>
                <AiIcon size={16} />
              </div>
              <div className={styles.messageContent}>
                <div className={styles.typingIndicator}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="输入你的问题..."
          disabled={isTyping}
        />
        <Button className={styles.sendBtn} onClick={() => handleSend()} disabled={!inputValue.trim() || isTyping}>
          <SendIcon size={18} />
        </Button>
      </div>
    </div>
  )
}