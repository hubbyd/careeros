export interface LocalQuestion {
  question: string;
  questionType: string;
  expectedPoints: string[];
}

export interface JobQuestions {
  [key: string]: LocalQuestion[];
}

export const localInterviewQuestions: JobQuestions = {
  '前端开发工程师': [
    {
      question: '请简述React中useEffect的执行时机和常见用法',
      questionType: '技术基础',
      expectedPoints: [
        'useEffect在组件挂载后、依赖变化时、组件卸载前执行',
        '依赖数组为空时仅在挂载时执行一次',
        '可以返回清理函数用于解绑事件、取消订阅等',
        '注意避免无限循环，正确设置依赖项'
      ]
    },
    {
      question: '请描述HTTP和HTTPS的区别，以及HTTPS的工作原理',
      questionType: '技术基础',
      expectedPoints: [
        'HTTP明文传输，HTTPS加密传输',
        'HTTPS使用SSL/TLS协议',
        'HTTPS需要CA证书',
        'HTTPS默认端口443，HTTP默认端口80',
        'HTTPS握手过程：客户端Hello、服务器Hello、证书验证、密钥交换'
      ]
    },
    {
      question: '请解释JavaScript中的闭包（Closure）是什么，以及它的应用场景',
      questionType: '技术基础',
      expectedPoints: [
        '闭包是指有权访问另一个函数作用域中变量的函数',
        '闭包可以创建私有变量和方法',
        '应用场景：数据封装、模块化、函数柯里化、防抖节流'
      ]
    },
    {
      question: '请描述你在项目中使用React Hooks的经验，遇到过哪些坑',
      questionType: '项目经验',
      expectedPoints: [
        'useState的异步更新问题',
        'useEffect的依赖项陷阱',
        '自定义Hook的命名规范',
        '避免在Hook中进行副作用操作'
      ]
    },
    {
      question: '请实现一个防抖函数（debounce）',
      questionType: '算法',
      expectedPoints: [
        '使用setTimeout延迟执行',
        '清除上一次的定时器',
        '支持立即执行选项',
        '正确处理this指向'
      ]
    },
    {
      question: '请描述Vue和React的区别',
      questionType: '技术基础',
      expectedPoints: [
        'Vue使用模板语法，React使用JSX',
        'Vue响应式基于Proxy，React基于状态更新',
        'Vue提供更多内置指令和工具',
        'React生态更丰富，社区更活跃'
      ]
    },
    {
      question: '请解释浏览器的事件循环（Event Loop）机制',
      questionType: '技术基础',
      expectedPoints: [
        '同步任务进入主线程执行',
        '异步任务进入任务队列',
        '执行栈为空时，主线程读取任务队列',
        '微任务优先于宏任务执行',
        '常见微任务：Promise.then、MutationObserver',
        '常见宏任务：setTimeout、setInterval、I/O'
      ]
    },
    {
      question: '请描述CSS Flexbox布局的常用属性',
      questionType: '技术基础',
      expectedPoints: [
        'flex-direction: 主轴方向',
        'justify-content: 主轴对齐方式',
        'align-items: 交叉轴对齐方式',
        'flex-wrap: 是否换行',
        'flex: flex-grow、flex-shrink、flex-basis的简写'
      ]
    }
  ],
  '后端开发工程师': [
    {
      question: '请描述TCP三次握手和四次挥手的过程',
      questionType: '技术基础',
      expectedPoints: [
        '三次握手：SYN -> SYN+ACK -> ACK',
        '第一次：客户端发送SYN，进入SYN_SENT',
        '第二次：服务器返回SYN+ACK，进入SYN_RCVD',
        '第三次：客户端发送ACK，进入ESTABLISHED',
        '四次挥手：FIN -> ACK -> FIN -> ACK'
      ]
    },
    {
      question: '请解释RESTful API的设计原则',
      questionType: '技术基础',
      expectedPoints: [
        '使用HTTP方法表示操作（GET/POST/PUT/DELETE）',
        '使用名词表示资源，而非动词',
        '无状态通信',
        '统一接口',
        '支持多种数据格式（JSON/XML）'
      ]
    },
    {
      question: '请描述数据库索引的作用和类型',
      questionType: '技术基础',
      expectedPoints: [
        '索引加速查询，减慢写入',
        'B-Tree索引：最常用，适合范围查询',
        'Hash索引：适合等值查询',
        '全文索引：适合文本搜索',
        '联合索引：多列组合索引，遵循最左前缀原则'
      ]
    },
    {
      question: '请描述你在项目中处理高并发的经验',
      questionType: '项目经验',
      expectedPoints: [
        '使用缓存减少数据库压力',
        '使用消息队列削峰填谷',
        '使用分布式锁保证数据一致性',
        '使用负载均衡分摊请求'
      ]
    },
    {
      question: '请实现一个简单的线程池',
      questionType: '算法',
      expectedPoints: [
        '维护一个任务队列',
        '创建固定数量的工作线程',
        '工作线程循环从队列中获取任务执行',
        '支持任务添加和线程池关闭'
      ]
    },
    {
      question: '请描述分布式系统中的CAP理论',
      questionType: '技术基础',
      expectedPoints: [
        '一致性（Consistency）：所有节点数据一致',
        '可用性（Availability）：每个请求都能得到响应',
        '分区容错性（Partition tolerance）：网络分区时系统仍能运行',
        '三者不可兼得，只能选择其中两个'
      ]
    },
    {
      question: '请描述Redis的常见数据结构和应用场景',
      questionType: '技术基础',
      expectedPoints: [
        'String：缓存、计数器',
        'Hash：存储对象',
        'List：消息队列、最新列表',
        'Set：去重、交集并集',
        'ZSet：排行榜、计分系统'
      ]
    }
  ],
  '全栈开发工程师': [
    {
      question: '请描述你对全栈开发的理解，以及你在项目中的角色',
      questionType: '项目经验',
      expectedPoints: [
        '全栈开发需要掌握前后端技术',
        '能够独立完成从需求分析到部署上线的全过程',
        '在团队中可以承担多个角色',
        '需要具备良好的架构设计能力'
      ]
    },
    {
      question: '请描述前后端分离的优缺点',
      questionType: '技术基础',
      expectedPoints: [
        '优点：职责清晰、开发效率高、便于维护、技术选型灵活',
        '缺点：沟通成本高、部署复杂、需要额外处理跨域问题',
        '需要定义清晰的API接口规范'
      ]
    },
    {
      question: '请描述你在项目中使用Docker的经验',
      questionType: '项目经验',
      expectedPoints: [
        '使用Dockerfile定义镜像',
        '使用docker-compose管理多容器',
        '使用Docker Hub或私有仓库存储镜像',
        '使用Docker进行环境隔离和部署'
      ]
    },
    {
      question: '请描述OAuth2.0的授权流程',
      questionType: '技术基础',
      expectedPoints: [
        '授权码模式：最常用，适合Web应用',
        '简化模式：适合移动端应用',
        '密码模式：适合信任的应用',
        '客户端模式：适合服务间通信',
        '流程：授权请求 -> 获取授权码 -> 获取令牌 -> 访问资源'
      ]
    }
  ],
  '算法工程师': [
    {
      question: '请描述快速排序的时间复杂度和实现原理',
      questionType: '算法',
      expectedPoints: [
        '平均时间复杂度O(nlogn)，最坏O(n²)',
        '采用分治思想',
        '选择基准元素，划分左右两部分',
        '递归排序左右部分',
        '可以使用随机基准优化'
      ]
    },
    {
      question: '请描述动态规划的适用场景和解题步骤',
      questionType: '算法',
      expectedPoints: [
        '适用场景：最优子结构、重叠子问题',
        '解题步骤：定义状态、状态转移方程、初始状态、计算顺序',
        '常见问题：最长递增子序列、背包问题、路径问题'
      ]
    },
    {
      question: '请描述二叉树的遍历方式',
      questionType: '算法',
      expectedPoints: [
        '前序遍历：根->左->右',
        '中序遍历：左->根->右',
        '后序遍历：左->右->根',
        '层序遍历：按层次从上到下',
        '递归和迭代两种实现方式'
      ]
    },
    {
      question: '请描述你在项目中使用机器学习算法的经验',
      questionType: '项目经验',
      expectedPoints: [
        '数据预处理：清洗、特征工程、归一化',
        '模型选择：根据问题类型选择合适算法',
        '模型训练：划分训练集和测试集',
        '模型评估：使用合适的评估指标',
        '模型调优：超参数优化、正则化'
      ]
    }
  ],
  '产品经理': [
    {
      question: '请描述你对产品经理角色的理解',
      questionType: '行为面试',
      expectedPoints: [
        '产品经理是产品的负责人',
        '需要具备用户思维、商业思维、技术思维',
        '负责需求分析、产品设计、项目管理',
        '需要与开发、设计、运营等团队协作'
      ]
    },
    {
      question: '请描述你在项目中如何进行需求分析',
      questionType: '项目经验',
      expectedPoints: [
        '用户调研：访谈、问卷、数据分析',
        '竞品分析：分析竞争对手的产品',
        '需求收集：收集各方需求',
        '需求优先级：使用优先级矩阵排序',
        '需求文档：编写PRD文档'
      ]
    },
    {
      question: '请描述你在项目中遇到的最大挑战，以及如何解决',
      questionType: '行为面试',
      expectedPoints: [
        '描述具体的挑战场景',
        '分析问题的根本原因',
        '采取的解决措施',
        '最终的结果和收获'
      ]
    },
    {
      question: '请描述你对产品数据指标的理解',
      questionType: '技术基础',
      expectedPoints: [
        '核心指标：DAU、MAU、留存率、转化率',
        '北极星指标：衡量产品成功的关键指标',
        '数据驱动：使用数据指导产品决策',
        'A/B测试：通过实验验证假设'
      ]
    }
  ],
  '测试工程师': [
    {
      question: '请描述软件测试的分类',
      questionType: '技术基础',
      expectedPoints: [
        '按测试阶段：单元测试、集成测试、系统测试、验收测试',
        '按测试方法：黑盒测试、白盒测试、灰盒测试',
        '按测试类型：功能测试、性能测试、安全测试、兼容性测试',
        '自动化测试：使用工具自动执行测试用例'
      ]
    },
    {
      question: '请描述你在项目中编写测试用例的经验',
      questionType: '项目经验',
      expectedPoints: [
        '使用等价类划分法',
        '使用边界值分析法',
        '考虑正常和异常场景',
        '编写清晰的测试步骤和预期结果',
        '使用测试管理工具管理用例'
      ]
    },
    {
      question: '请描述你对自动化测试的理解',
      questionType: '技术基础',
      expectedPoints: [
        '自动化测试可以提高测试效率',
        '适合回归测试、重复测试',
        '常用工具：Selenium、Appium、Jest、JUnit',
        '需要维护测试脚本'
      ]
    },
    {
      question: '请描述你在项目中发现的最严重的Bug，以及如何定位',
      questionType: '项目经验',
      expectedPoints: [
        '描述Bug的现象',
        '使用日志、调试工具定位',
        '分析问题的根本原因',
        '编写测试用例复现',
        '跟踪修复过程'
      ]
    }
  ],
  '运维工程师': [
    {
      question: '请描述Linux系统中常用的命令',
      questionType: '技术基础',
      expectedPoints: [
        '文件操作：ls、cd、cp、mv、rm',
        '进程管理：ps、top、kill',
        '网络管理：ifconfig、netstat、ping',
        '日志查看：cat、tail、grep',
        '权限管理：chmod、chown'
      ]
    },
    {
      question: '请描述你对DevOps的理解',
      questionType: '技术基础',
      expectedPoints: [
        'DevOps是开发和运维的协作',
        '持续集成（CI）：自动构建和测试',
        '持续部署（CD）：自动部署到生产环境',
        '基础设施即代码（IaC）：使用代码管理基础设施',
        '监控和日志：实时监控系统状态'
      ]
    },
    {
      question: '请描述你在项目中处理服务器故障的经验',
      questionType: '项目经验',
      expectedPoints: [
        '快速定位故障原因',
        '实施应急措施恢复服务',
        '分析根本原因',
        '制定预防措施',
        '记录故障处理过程'
      ]
    },
    {
      question: '请描述Docker容器和虚拟机的区别',
      questionType: '技术基础',
      expectedPoints: [
        '容器共享宿主机内核，虚拟机有独立内核',
        '容器更轻量，启动更快',
        '虚拟机隔离性更好',
        '容器适合微服务，虚拟机适合传统应用',
        '容器使用镜像，虚拟机使用快照'
      ]
    }
  ],
  '数据分析师': [
    {
      question: '请描述你对数据分析流程的理解',
      questionType: '技术基础',
      expectedPoints: [
        '数据收集：获取原始数据',
        '数据清洗：处理缺失值、异常值',
        '数据探索：使用可视化工具分析',
        '数据建模：构建分析模型',
        '结果呈现：编写分析报告'
      ]
    },
    {
      question: '请描述你在项目中使用SQL的经验',
      questionType: '技术基础',
      expectedPoints: [
        '查询数据：SELECT语句',
        '聚合函数：SUM、COUNT、AVG',
        '分组查询：GROUP BY',
        '连接查询：JOIN',
        '子查询和窗口函数'
      ]
    },
    {
      question: '请描述你在项目中使用Python进行数据分析的经验',
      questionType: '项目经验',
      expectedPoints: [
        '使用pandas处理数据',
        '使用numpy进行数值计算',
        '使用matplotlib/seaborn可视化',
        '使用scikit-learn构建模型',
        '处理大数据时的性能优化'
      ]
    },
    {
      question: '请描述你对数据可视化的理解',
      questionType: '技术基础',
      expectedPoints: [
        '选择合适的图表类型',
        '清晰展示数据关系',
        '突出关键信息',
        '保持简洁美观',
        '使用专业的可视化工具'
      ]
    }
  ],
  '不限': [
    {
      question: '请介绍你自己',
      questionType: '行为面试',
      expectedPoints: [
        '个人基本信息',
        '教育背景',
        '工作/项目经验',
        '技能特长',
        '职业目标'
      ]
    },
    {
      question: '请描述你在学校期间参与过的最让你有成就感的一个项目',
      questionType: '项目经验',
      expectedPoints: [
        '项目背景和目标',
        '个人角色和职责',
        '遇到的挑战',
        '解决方法',
        '最终成果和收获'
      ]
    },
    {
      question: '请描述你的职业规划',
      questionType: '行为面试',
      expectedPoints: [
        '短期目标（1-2年）',
        '中期目标（3-5年）',
        '长期目标',
        '如何实现目标',
        '为什么选择这个行业'
      ]
    },
    {
      question: '请描述你的优点和缺点',
      questionType: '行为面试',
      expectedPoints: [
        '优点：结合具体事例',
        '缺点：真实且有改进计划',
        '体现自我认知能力',
        '展示学习和成长的态度'
      ]
    },
    {
      question: '你有什么问题想问我们吗？',
      questionType: '行为面试',
      expectedPoints: [
        '询问公司文化',
        '询问团队情况',
        '询问岗位发展',
        '展示对公司的兴趣',
        '避免询问薪资等敏感问题'
      ]
    }
  ]
};

export function getLocalQuestions(jobTitle: string, count: number = 5): LocalQuestion[] {
  const questions = localInterviewQuestions[jobTitle] || localInterviewQuestions['不限'];
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}