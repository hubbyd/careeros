# 求职冲刺 JobSprint 🚀

个人求职发展全能 App —— 活力激励风设计，全栈实现。

## 功能模块

| 模块 | 功能 |
|------|------|
| 🏠 首页 Dashboard | Streak 火焰激励 + 今日待办（可勾选）+ 本周进度环形图 |
| 📋 求职进度看板 | 6 状态 Kanban + 添加/编辑/删除申请 + 优先级标签 + 截止日期倒计时 |
| ⏱️ 学习督促打卡 | 🔥 连续打卡 + 番茄钟真实倒计时 + 学习科目 + 成就徽章 |
| 🎤 面试题库 | 5 大分类 + 掌握度标记 + 收藏 + 答题统计 |
| 📊 能力成长档案 | 六维雷达图 + 月度成长曲线 + 项目经历 |
| 🧭 方向探索 | 7 步职业导师咨询 Wizard + 个性化规划报告 |

## 技术栈

### 前端
- React 18 + TypeScript
- Vite 5（构建工具）
- Zustand（状态管理）
- React Router v6（路由）
- Recharts（图表）
- CSS Modules（样式）

### 后端
- Node.js + Express + TypeScript
- Prisma ORM + SQLite
- JWT 认证
- bcryptjs（密码加密）
- Zod（参数验证）

## 快速启动

### 后端（端口 3002）
```bash
cd server
npm install
npx prisma migrate dev   # 初始化数据库
npx tsx src/index.ts     # 启动后端
```

### 前端（端口 5173）
```bash
npm install
npm run dev               # 启动前端开发服务器
```

### 生产构建
```bash
npm run build             # 构建前端 → dist/
cd server && npm run build # 构建后端 → dist/
```

## 环境变量

### `server/.env`
```
DATABASE_URL="file:./jobsprint.db"
JWT_SECRET="jobsprint-super-secret-key-2024"
PORT=3002
NODE_ENV=development
```

### `frontend/.env`（可选）
```
VITE_API_URL=http://localhost:3002/api
```

## 推送 GitHub

```bash
# 1. 在 GitHub 创建新仓库（名：jobsprint）
# 2. 关联远程仓库并推送
git remote add origin https://github.com/YOUR_USERNAME/jobsprint.git
git branch -M main
git push -u origin main
```

## 项目结构

```
jobsprint/
├── src/                  # 前端源码
│   ├── api/              # API 客户端
│   ├── components/       # 通用组件
│   ├── features/         # 页面模块
│   ├── stores/           # Zustand Store
│   ├── theme/            # 设计 Token
│   └── types/            # TypeScript 类型
├── server/               # 后端源码
│   ├── src/
│   │   ├── routes/       # API 路由
│   │   ├── middleware/   # 认证中间件
│   │   └── utils/       # Prisma 客户端
│   └── prisma/          # 数据库 Schema
├── dist/                 # 前端构建产物
└── server/prisma/        # SQLite 数据库
```

## 已完成的后端 API

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/auth/register` | POST | 注册 |
| `/api/auth/login` | POST | 登录 |
| `/api/auth/me` | GET | 获取当前用户 |
| `/api/todos` | GET/POST | 待办列表/创建 |
| `/api/todos/:id/toggle` | PATCH | 切换完成状态 |
| `/api/applications` | GET/POST | 申请列表/创建 |
| `/api/applications/:id` | PUT/DELETE | 更新/删除申请 |
| `/api/study/checkin` | POST | 学习打卡 |
| `/api/study/streak` | GET | 打卡统计 |
| `/api/questions` | GET/POST | 题库列表/添加 |
| `/api/career` | GET/POST | 职业测评 |

## 已知问题 / 待完善

- [ ] 前端部分 Store 仍使用 Mock 数据（todos、applications 已接 API）
- [ ] AI 模拟面试为演示页面（未接入真实 AI API）
- [ ] 简历上传功能未实现
- [ ] PWA 配置未添加
- [ ] 单元测试未添加

## License

MIT
