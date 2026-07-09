import { useState, useEffect, useRef } from 'react'
import { useUserStore } from '../../stores/useUserStore'
import { useQuestionStore } from '../../stores/useQuestionStore'
import { useStudyStore } from '../../stores/useStudyStore'
import { useApplicationStore } from '../../stores/useApplicationStore'
import { growthApi, careerApi, authApi } from '../../api'
import { LogOutIcon, SettingsIcon, ShieldIcon, RefreshIcon } from '../../components/Icons'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { TargetIcon, FileIcon, MessageIcon, BookIcon, CheckIcon, BriefcaseIcon } from '../../components/Icons'
import type { GrowthRecord, CareerMatch } from '../../types'
import styles from './ProfilePage.module.css'

const typeIcons: Record<string, React.ReactNode> = {
  diagnosis: <TargetIcon size={20} />,
  resume: <FileIcon size={20} />,
  interview: <MessageIcon size={20} />,
  learning: <BookIcon size={20} />,
  study: <BookIcon size={20} />,
  checkin: <CheckIcon size={20} />,
  application: <BriefcaseIcon size={20} />,
}

const typeLabels: Record<string, string> = {
  diagnosis: '职业诊断',
  resume: '简历优化',
  interview: '模拟面试',
  learning: '学习计划',
  study: '学习打卡',
  checkin: '打卡',
  application: '职位投递',
}

const titleOptions = [
  '前端工程师', '后端工程师', '全栈工程师', '产品经理', 'UI/UX设计师',
  '数据分析师', '算法工程师', '测试工程师', '运维工程师', '项目经理',
  '运营专员', '市场专员', '销售经理', '人力资源', '财务专员',
  '求职中', '应届生', '实习', '自由职业', '其他',
]

const provinceCityData: Record<string, string[]> = {
  '北京市': ['东城区', '西城区', '朝阳区', '海淀区', '丰台区', '石景山区', '通州区', '顺义区', '昌平区', '大兴区', '房山区', '门头沟区', '怀柔区', '平谷区', '密云区', '延庆区'],
  '天津市': ['和平区', '河东区', '河西区', '南开区', '河北区', '红桥区', '东丽区', '西青区', '津南区', '北辰区', '武清区', '宝坻区', '滨海新区', '宁河区', '静海区', '蓟州区'],
  '河北省': ['石家庄市', '唐山市', '秦皇岛市', '邯郸市', '邢台市', '保定市', '张家口市', '承德市', '沧州市', '廊坊市', '衡水市'],
  '山西省': ['太原市', '大同市', '阳泉市', '长治市', '晋城市', '朔州市', '晋中市', '运城市', '忻州市', '临汾市', '吕梁市'],
  '内蒙古自治区': ['呼和浩特市', '包头市', '乌海市', '赤峰市', '通辽市', '鄂尔多斯市', '呼伦贝尔市', '巴彦淖尔市', '乌兰察布市', '兴安盟', '锡林郭勒盟', '阿拉善盟'],
  '辽宁省': ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市', '阜新市', '辽阳市', '盘锦市', '铁岭市', '朝阳市', '葫芦岛市'],
  '吉林省': ['长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市', '延边朝鲜族自治州'],
  '黑龙江省': ['哈尔滨市', '齐齐哈尔市', '鸡西市', '鹤岗市', '双鸭山市', '大庆市', '伊春市', '佳木斯市', '七台河市', '牡丹江市', '黑河市', '绥化市', '大兴安岭地区'],
  '上海市': ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区'],
  '江苏省': ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮安市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市'],
  '浙江省': ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'],
  '安徽省': ['合肥市', '芜湖市', '蚌埠市', '淮南市', '马鞍山市', '淮北市', '铜陵市', '安庆市', '黄山市', '滁州市', '阜阳市', '宿州市', '六安市', '亳州市', '池州市', '宣城市'],
  '福建省': ['福州市', '厦门市', '莆田市', '三明市', '泉州市', '漳州市', '南平市', '龙岩市', '宁德市'],
  '江西省': ['南昌市', '景德镇市', '萍乡市', '九江市', '新余市', '鹰潭市', '赣州市', '吉安市', '宜春市', '抚州市', '上饶市'],
  '山东省': ['济南市', '青岛市', '淄博市', '枣庄市', '东营市', '烟台市', '潍坊市', '济宁市', '泰安市', '威海市', '日照市', '莱芜市', '临沂市', '德州市', '聊城市', '滨州市', '菏泽市'],
  '河南省': ['郑州市', '开封市', '洛阳市', '平顶山市', '安阳市', '鹤壁市', '新乡市', '焦作市', '濮阳市', '许昌市', '漯河市', '三门峡市', '南阳市', '商丘市', '信阳市', '周口市', '驻马店市'],
  '湖北省': ['武汉市', '黄石市', '十堰市', '宜昌市', '襄阳市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '随州市', '恩施土家族苗族自治州'],
  '湖南省': ['长沙市', '株洲市', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市', '永州市', '怀化市', '娄底市', '湘西土家族苗族自治州'],
  '广东省': ['广州市', '韶关市', '深圳市', '珠海市', '汕头市', '佛山市', '江门市', '湛江市', '茂名市', '肇庆市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'],
  '广西壮族自治区': ['南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市', '玉林市', '百色市', '贺州市', '河池市', '来宾市', '崇左市'],
  '海南省': ['海口市', '三亚市', '三沙市', '儋州市', '五指山市', '琼海市', '文昌市', '万宁市', '东方市'],
  '重庆市': ['万州区', '涪陵区', '渝中区', '大渡口区', '江北区', '沙坪坝区', '九龙坡区', '南岸区', '北碚区', '綦江区', '大足区', '渝北区', '巴南区', '黔江区', '长寿区', '江津区', '合川区', '永川区', '南川区', '璧山区', '铜梁区', '潼南区', '荣昌区', '开州区', '梁平区', '武隆区'],
  '四川省': ['成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市', '南充市', '眉山市', '宜宾市', '广安市', '达州市', '雅安市', '巴中市', '资阳市', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
  '贵州省': ['贵阳市', '六盘水市', '遵义市', '安顺市', '毕节市', '铜仁市', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
  '云南省': ['昆明市', '曲靖市', '玉溪市', '保山市', '昭通市', '丽江市', '普洱市', '临沧市', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '大理白族自治州', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州'],
  '西藏自治区': ['拉萨市', '日喀则市', '昌都市', '林芝市', '山南市', '那曲市', '阿里地区'],
  '陕西省': ['西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '榆林市', '安康市', '商洛市'],
  '甘肃省': ['兰州市', '嘉峪关市', '金昌市', '白银市', '天水市', '酒泉市', '张掖市', '武威市', '定西市', '陇南市', '平凉市', '庆阳市', '临夏回族自治州', '甘南藏族自治州'],
  '青海省': ['西宁市', '海东市', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
  '宁夏回族自治区': ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市'],
  '新疆维吾尔自治区': ['乌鲁木齐市', '克拉玛依市', '吐鲁番市', '哈密市', '昌吉回族自治州', '博尔塔拉蒙古自治州', '巴音郭楞蒙古自治州', '阿克苏地区', '克孜勒苏柯尔克孜自治州', '喀什地区', '和田地区', '伊犁哈萨克自治州', '塔城地区', '阿勒泰地区'],
  '香港特别行政区': ['香港'],
  '澳门特别行政区': ['澳门'],
  '台湾省': ['台北市', '新北市', '桃园市', '台中市', '台南市', '高雄市', '基隆市', '新竹市', '嘉义市'],
}

const provinceOptions = Object.keys(provinceCityData)

const educationOptions = [
  '博士', '硕士', '本科', '大专', '高中/中专', '初中及以下',
]

const experienceOptions = [
  '应届生', '1年以内', '1-3年', '3-5年', '5-8年', '8-10年', '10年以上',
]

const skillOptions = [
  'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'Go', 'TypeScript', 'JavaScript',
  'HTML/CSS', 'CSS', 'Tailwind', 'Ant Design', 'Element UI', 'Webpack', 'Vite', 'Next.js',
  'Spring Boot', 'Django', 'Flask', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite',
  'Git', 'Docker', 'Kubernetes', 'AWS', '阿里云', '腾讯云', 'Linux', 'Nginx',
  '算法', '数据结构', '系统设计', '微服务', 'RESTful', 'GraphQL', 'WebSocket', 'SSE',
  '测试', 'Jest', 'Cypress', 'Postman', 'VS Code', 'Figma', 'Photoshop', 'Sketch',
]

export default function ProfilePage() {
  const profile = useUserStore((s) => s.profile)
  const updateProfile = useUserStore((s) => s.updateProfile)
  const user = useUserStore((s) => s.user)
  const masteryRate = useQuestionStore((s) => s.getMasteryRate())
  const streak = useStudyStore((s) => s.streak.current)
  const applications = useApplicationStore((s) => s.applications)
  const [records, setRecords] = useState<GrowthRecord[]>([])
  const [skills, setSkills] = useState<{ skill: string; value: number }[]>([])
  const [growthData, setGrowthData] = useState<{ month: string; score: number }[]>([])
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    avatar: '',
    title: '',
    bio: '',
    location: '',
    education: '',
    experience: '',
    skills: '',
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [skillSearch, setSkillSearch] = useState('')
  const [showSkillDropdown, setShowSkillDropdown] = useState(false)
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.skillSelector')) {
        setShowSkillDropdown(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    let mounted = true
    
    const loadData = async () => {
      try {
        const [recordsData, careerData] = await Promise.all([
          growthApi.records().catch(() => []),
          careerApi.get().catch(() => ({ matches: [], suggestions: [] }))
        ])
        
        if (!mounted) return
        
        setRecords(recordsData || [])
        
        const monthlyData: Record<string, number> = {}
        const now = new Date()
        for (let i = 5; i >= 0; i--) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const monthKey = `${date.getMonth() + 1}月`
          monthlyData[monthKey] = 0
        }
        
        (recordsData || []).forEach(record => {
          try {
            const recordDate = new Date(record.createdAt)
            const monthKey = `${recordDate.getMonth() + 1}月`
            if (monthlyData[monthKey] !== undefined) {
              monthlyData[monthKey] += 1
            }
          } catch {}
        })
        
        let baseScore = 30
        const growthDataArray = Object.entries(monthlyData).map(([month, count]) => {
          baseScore += count * 5 + Math.random() * 3
          return {
            month,
            score: Math.min(Math.max(baseScore, 20), 95)
          }
        })
        
        setGrowthData(growthDataArray)
        
        if (careerData.matches) {
          setCareerMatches(careerData.matches)
        }
        
        if (careerData.suggestions && careerData.suggestions.length > 0) {
          const skillMap: Record<string, number> = {}
          careerData.suggestions.forEach((s: string) => {
            if (s.includes('JavaScript') || s.includes('JS')) skillMap['JavaScript'] = (skillMap['JavaScript'] || 0) + 20
            if (s.includes('React') || s.includes('框架')) skillMap['React'] = (skillMap['React'] || 0) + 15
            if (s.includes('CSS') || s.includes('样式')) skillMap['CSS'] = (skillMap['CSS'] || 0) + 15
            if (s.includes('算法') || s.includes('数据结构')) skillMap['算法'] = (skillMap['算法'] || 0) + 10
            if (s.includes('系统设计')) skillMap['系统设计'] = (skillMap['系统设计'] || 0) + 10
            if (s.includes('沟通') || s.includes('表达')) skillMap['沟通表达'] = (skillMap['沟通表达'] || 0) + 15
          })
          setSkills(Object.entries(skillMap).map(([skill, value]) => ({
            skill,
            value: Math.min(value + Math.random() * 30, 95)
          })))
        } else {
          setSkills([
            { skill: 'JavaScript', value: 75 + Math.random() * 10 },
            { skill: 'React', value: 70 + Math.random() * 10 },
            { skill: 'CSS', value: 65 + Math.random() * 10 },
            { skill: '算法', value: 50 + Math.random() * 15 },
            { skill: '系统设计', value: 40 + Math.random() * 15 },
            { skill: '沟通表达', value: 80 + Math.random() * 10 },
          ])
        }
      } catch (err) {
        console.error('加载数据失败:', err)
        setSkills([
          { skill: 'JavaScript', value: 75 },
          { skill: 'React', value: 70 },
          { skill: 'CSS', value: 65 },
          { skill: '算法', value: 50 },
          { skill: '系统设计', value: 40 },
          { skill: '沟通表达', value: 80 },
        ])
      } finally {
        if (mounted) {
          setPageLoading(false)
        }
      }
    }
    
    loadData()
    
    return () => {
      mounted = false
    }
  }, [])

  const handleDeleteRecord = async (id: string) => {
    try {
      await growthApi.deleteRecord(id)
      setRecords(records.filter(r => r.id !== id))
    } catch (error) {
      console.error('删除失败:', error)
    }
  }

  const handleEdit = () => {
    if (profile) {
      setEditData({
        name: profile.name || '',
        avatar: profile.avatar || '',
        title: profile.title || '',
        bio: profile.bio || '',
        location: profile.location || '',
        education: profile.education || '',
        experience: profile.experience || '',
        skills: profile.skills?.join(', ') || '',
      })
      setPreviewImage(profile.avatar || null)
      setSelectedSkills(profile.skills || [])
      setSkillSearch('')
      setShowSkillDropdown(false)
      
      const location = profile.location || ''
      const parts = location.split(' ')
      if (parts.length >= 2) {
        setSelectedProvince(parts[0])
        setSelectedCity(parts.slice(1).join(' '))
      } else {
        setSelectedProvince('')
        setSelectedCity('')
      }
      
      setIsEditing(true)
    }
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => {
      if (prev.includes(skill)) {
        return prev.filter(s => s !== skill)
      } else {
        return [...prev, skill]
      }
    })
  }

  const filteredSkills = skillOptions.filter(skill =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  )

  const handleSkillSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillSearch(e.target.value)
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('图片大小不能超过2MB')
      return
    }

    const reader = new FileReader()
    reader.onload = async (event) => {
      const base64 = event.target?.result as string
      setPreviewImage(base64)
      setEditData({ ...editData, avatar: base64 })
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    setLoading(true)
    setError('')
    
    try {
      const dataToSave = {
        ...editData,
        skills: selectedSkills.join(', '),
        location: selectedProvince && selectedCity ? `${selectedProvince} ${selectedCity}` : '',
      }
      const updated = await authApi.updateMe(dataToSave)
      updateProfile({
        name: updated.name || profile?.name || '',
        title: updated.title || profile?.title || '',
        avatar: updated.avatar || profile?.avatar || '',
        bio: updated.bio || profile?.bio,
        location: updated.location || profile?.location,
        education: updated.education || profile?.education,
        experience: updated.experience || profile?.experience,
        createdAt: updated.createdAt || profile?.createdAt,
        skills: Array.isArray(updated.skills) ? updated.skills : (updated.skills?.split(',').map((s: string) => s.trim()).filter(Boolean) || profile?.skills),
      })
      setIsEditing(false)
    } catch (err: any) {
      setError(err.message || '保存失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      useUserStore.getState().logout()
      window.location.href = '/login'
    }
  }

  const parseContent = (content: string) => {
    try {
      const parsed = JSON.parse(content)
      if (typeof parsed === 'object') {
        return parsed
      }
    } catch {}
    return content
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return '今天'
    if (days === 1) return '昨天'
    if (days < 7) return `${days}天前`
    return date.toLocaleDateString('zh-CN')
  }

  const offerCount = applications.filter(a => a.status === 'offer').length
  const appliedCount = applications.length

  if (pageLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <span>加载中...</span>
        </div>
      </div>
    )
  }

  if (!profile && !user) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>
          <span>🔒</span>
          <span>请先登录查看个人资料</span>
          <button className={styles.loginBtn} onClick={() => window.location.href = '/login'}>立即登录</button>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>
          <span>👤</span>
          <span>个人资料加载中...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        {isEditing ? (
          <div className={styles.editForm}>
            <h3 className={styles.formTitle}>编辑个人资料</h3>
            {error && (
              <div className={styles.formError}>
                {error}
                <button onClick={() => setError('')} className={styles.errorClose}>✕</button>
              </div>
            )}
            <div className={styles.formRow}>
              <label className={styles.formLabel}>头像</label>
              <div className={styles.avatarUploadSection}>
                <div className={styles.avatarPreview} onClick={handleAvatarClick}>
                  {previewImage ? (
                    <img src={previewImage} alt="头像预览" className={styles.previewImg} />
                  ) : (
                    <span className={styles.avatarPlaceholder}>📷</span>
                  )}
                  <div className={styles.avatarUploadHint}>点击选择图片</div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleAvatarUpload}
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <label className={styles.formLabel}>姓名</label>
              <input
                type="text"
                className={styles.formInput}
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </div>
            <div className={styles.formRow}>
              <label className={styles.formLabel}>头衔</label>
              <select
                className={styles.formSelect}
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              >
                <option value="">请选择头衔</option>
                {titleOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className={styles.formRow}>
              <label className={styles.formLabel}>简介</label>
              <textarea
                className={styles.formTextarea}
                value={editData.bio}
                onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                placeholder="简单介绍一下自己..."
                rows={3}
              />
            </div>
            <div className={styles.formRow}>
              <label className={styles.formLabel}>所在地</label>
              <div className={styles.locationSelectors}>
                <select
                  className={styles.formSelect}
                  value={selectedProvince}
                  onChange={(e) => {
                    setSelectedProvince(e.target.value)
                    setSelectedCity('')
                  }}
                >
                  <option value="">请选择省份</option>
                  {provinceOptions.map((province) => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
                <select
                  className={styles.formSelect}
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedProvince}
                >
                  <option value="">请选择城市</option>
                  {selectedProvince && provinceCityData[selectedProvince]?.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.formRow}>
              <label className={styles.formLabel}>学历</label>
              <select
                className={styles.formSelect}
                value={editData.education}
                onChange={(e) => setEditData({ ...editData, education: e.target.value })}
              >
                <option value="">请选择学历</option>
                {educationOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className={styles.formRow}>
              <label className={styles.formLabel}>工作经验</label>
              <select
                className={styles.formSelect}
                value={editData.experience}
                onChange={(e) => setEditData({ ...editData, experience: e.target.value })}
              >
                <option value="">请选择工作经验</option>
                {experienceOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className={styles.formRow}>
              <label className={styles.formLabel}>技能标签</label>
              <div className={styles.skillSelector}>
                <input
                  type="text"
                  className={styles.skillSearchInput}
                  value={skillSearch}
                  onChange={handleSkillSearchChange}
                  onFocus={() => setShowSkillDropdown(true)}
                  placeholder="搜索技能..."
                />
                {selectedSkills.length > 0 && (
                  <div className={styles.selectedSkills}>
                    {selectedSkills.map((skill) => (
                      <span key={skill} className={styles.selectedSkill}>
                        {skill}
                        <button className={styles.removeSkill} onClick={() => toggleSkill(skill)}>×</button>
                      </span>
                    ))}
                  </div>
                )}
                {showSkillDropdown && (
                  <div className={styles.skillDropdown}>
                    {filteredSkills.map((skill) => (
                      <button
                        key={skill}
                        className={`${styles.skillOption} ${selectedSkills.includes(skill) ? styles.skillSelected : ''}`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {selectedSkills.includes(skill) && '✓ '}
                        {skill}
                      </button>
                    ))}
                    {filteredSkills.length === 0 && (
                      <div className={styles.skillNoResult}>没有找到匹配的技能</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.formActions}>
              <button className={styles.saveBtn} onClick={handleSave} disabled={loading}>
                {loading ? '保存中...' : '保存'}
              </button>
              <button className={styles.cancelBtn} onClick={handleCancel} disabled={loading}>取消</button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.avatar}>
              {profile.avatar && profile.avatar.startsWith('data:image') ? (
                <img src={profile.avatar} alt="头像" className={styles.avatarImg} />
              ) : (
                profile.avatar || '👤'
              )}
            </div>
            <div className={styles.name}>{profile.name}</div>
            <div className={styles.title}>{profile.title || '添加你的职业头衔'}</div>
            {profile.bio && <div className={styles.bio}>{profile.bio}</div>}
            <div className={styles.profileMeta}>
              {profile.location && <span>📍 {profile.location}</span>}
              {profile.education && <span>🎓 {profile.education}</span>}
              {profile.experience && <span>💼 {profile.experience}经验</span>}
            </div>
            {profile.skills && profile.skills.length > 0 && (
              <div className={styles.skills}>
                {profile.skills.map((skill: string, i: number) => (
                  <span key={i} className={styles.skillTag}>{skill.trim()}</span>
                ))}
              </div>
            )}
            <div className={styles.joinDate}>加入于 {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('zh-CN') : ''}</div>
            <button className={styles.editBtn} onClick={handleEdit}>编辑资料</button>
            <div className={styles.accountActions}>
              <button className={styles.accountActionBtn} onClick={handleLogout}>
                <LogOutIcon size={16} />
                <span>退出登录</span>
              </button>
            </div>
          </>
        )}
      </section>

      <section className={styles.statsRow}>
        {[
          { label: '掌握率', value: `${masteryRate}%`, color: '#6366F1' },
          { label: '打卡天数', value: `${streak}`, color: '#EC4899' },
          { label: '投递数', value: `${appliedCount}`, color: '#0EA5E9' },
          { label: 'Offer', value: `${offerCount}`, color: '#10B981' },
        ].map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statVal} style={{ color: s.color }}>
              {s.value}
            </div>
            <div className={styles.statLbl}>{s.label}</div>
          </div>
        ))}
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>📡 能力雷达图</h3>
        <div className={styles.chartBox}>
          <ResponsiveContainer width="100%" height={380}>
            <RadarChart data={skills} cx="50%" cy="50%" outerRadius={120}>
              <defs>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.7} />
                  <stop offset="33%" stopColor="#8B5CF6" stopOpacity={0.5} />
                  <stop offset="66%" stopColor="#EC4899" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.3} />
                </linearGradient>
                <filter id="radarGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="radarGlowStrong" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <PolarGrid stroke="var(--border-soft)" strokeWidth={1} />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ 
                  fill: 'var(--text-secondary)', 
                  fontSize: 14, 
                  fontWeight: 600,
                  fontFamily: 'inherit',
                }} 
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ 
                  fill: 'var(--text-tertiary)', 
                  fontSize: 11,
                  fontFamily: 'inherit',
                }} 
                axisLine={{ stroke: 'var(--border-soft)' }}
              />
              <Radar
                name="能力值"
                dataKey="value"
                stroke="#8B5CF6"
                fill="url(#radarGradient)"
                strokeWidth={3}
                filter="url(#radarGlowStrong)"
                opacity={0.9}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--surface)', 
                  border: '1px solid var(--border)', 
                  borderRadius: 'var(--r-lg)',
                  boxShadow: 'var(--shadow-md)',
                  padding: 'var(--sp-3)',
                }}
                formatter={(value: number) => [`${value.toFixed(1)}%`, '能力值']}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>📈 月度成长曲线</h3>
        <div className={styles.chartBox}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={growthData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="score" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {careerMatches.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>🎯 职业匹配</h3>
          <div className={styles.matchList}>
            {careerMatches.slice(0, 3).map((match, index) => (
              <div key={index} className={styles.matchCard}>
                <div className={styles.matchHeader}>
                  <span className={styles.matchTitle}>{match.title}</span>
                  <span className={styles.matchScore} style={{ color: match.match >= 80 ? '#10B981' : match.match >= 60 ? '#F59E0B' : '#EF4444' }}>
                    {match.match}%
                  </span>
                </div>
                <div className={styles.matchSalary}>{match.salaryRange}</div>
                <div className={styles.matchTags}>
                  {match.tags?.slice(0, 3).map((tag, i) => (
                    <span key={i} className={styles.matchTag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}> 成长记录</h3>
        {records.length === 0 ? (
          <div className={styles.emptyRecords}>
            <span>🌱</span>
            <span>暂无成长记录，开始你的求职之旅吧！</span>
          </div>
        ) : (
          <div className={styles.recordList}>
            {records.map(record => {
              const content = parseContent(record.content)
              const icon = typeIcons[record.type] || '📌'
              const label = typeLabels[record.type] || record.type
              
              return (
                <div key={record.id} className={styles.recordItem}>
                  <div className={styles.recordIcon}>{icon}</div>
                  <div className={styles.recordContent}>
                    <div className={styles.recordHeader}>
                      <span className={styles.recordLabel}>{label}</span>
                      <span className={styles.recordDate}>{formatDate(record.createdAt)}</span>
                    </div>
                    <p className={styles.recordText}>
                      {typeof content === 'object' && content.summary 
                        ? content.summary 
                        : typeof content === 'object' && content.type
                          ? content.type
                          : content}
                    </p>
                    {typeof content === 'object' && content.matches && content.matches.length > 0 && (
                      <div className={styles.recordTags}>
                        {content.matches.slice(0, 3).map((m: any, i: number) => (
                          <span key={i} className={styles.recordTag}>{m}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className={styles.recordDelete} onClick={() => handleDeleteRecord(record.id)}>
                    ✕
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>
      </div>
    </div>
  )
}