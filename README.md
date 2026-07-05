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
- Prisma ORM + **PostgreSQL**
- JWT 认证
- bcryptjs（密码加密）
- Zod（参数验证）

## 快速启动（本地开发）

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
DATABASE_URL="postgresql://user:password@localhost:5432/jobsprint"
JWT_SECRET="jobsprint-super-secret-key-2024"
PORT=3002
NODE_ENV=development
```

> **生产环境**：不需要 `.env` 文件，Render 会通过环境变量注入 `DATABASE_URL` 和 `JWT_SECRET`。

## 推送 GitHub

### 方式一：在网页上创建仓库（推荐）

1. 打开 [GitHub](https://github.com)，登录
2. 点击右上角 `+` → `New repository`
3. 仓库名填 `jobsprint`，**不要**勾选 `Initialize with README`
4. 点击 `Create repository`
5. 复制仓库 URL（类似 `https://github.com/hubbyd/jobsprint.git`）

### 方式二：用 Personal Access Token 推送

1. 打开 [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. 点击 `Generate new token (classic)`
3. 勾选 `repo` 权限，点击 `Generate token`
4. 复制生成的 token（只显示一次）

### 推送命令

```bash
# 如果还没关联远程仓库
git remote set-url origin https://github.com/hubbyd/jobsprint.git

# 推送（会提示输入用户名和密码）
# 用户名：你的 GitHub 用户名
# 密码：粘贴刚才复制的 Personal Access Token（不是 GitHub 登录密码）
git push -u origin main
```

> **Windows 用户**：如果在 CMD 里推送失败，可以用 [GitHub Desktop](https://desktop.github.com/) 或 [Git Credential Manager](https://github.com/GitCredentialManager/git-credential-manager) 来认证。

## 部署到 Render

### 一键部署步骤

1. **推送代码到 GitHub**（参考上面步骤）

2. **登录 [Render](https://render.com)**
   - 用 GitHub 账号登录

3. **创建 PostgreSQL 数据库**
   - 点击 `New +` → `PostgreSQL`
   - Name: `jobsprint-db`
   - Plan: `Free`
   - 点击 `Create Database`
   - 复制 `Internal Database URL`（后面要用）

4. **创建 Web Service**
   - 点击 `New +` → `Web Service`
   - 连接你的 GitHub 仓库 `jobsprint`
   - 配置：
     - **Name**: `jobsprint`
     - **Root Directory**: `server`
     - **Runtime**: `Node`
     - **Build Command**:
       ```bash
       cd .. && npm install && npm run build
       npm install && npm run build
       ```
     - **Start Command**: `npm start`
   - **环境变量**：
     - `NODE_ENV`: `production`
     - `JWT_SECRET`: 点击 `Generate` 自动生成
     - `DATABASE_URL`: 粘贴刚才复制的 PostgreSQL Internal Database URL
   - 点击 `Create Web Service`

5. **等待部署完成**（约 2-3 分钟）

6. **访问你的 App**
   - Render 会给你一个 `https://jobsprint.onrender.com` 的地址
   - 打开即可使用！

### 使用 render.yaml 一键部署（高级）

如果你把 `render.yaml` 推送到仓库，Render 可以自动读取配置：

1. 推送代码到 GitHub
2. 在 Render 上点击 `New +` → `Blueprint`
3. 选择 `jobsprint` 仓库
4. Render 会自动创建 Web Service 和数据库

> **注意**：免费版 Render 的 Web Service 15 分钟无访问会休眠，下次访问需要等待约 30 秒唤醒。

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
├── render.yaml           # Render 部署配置
└── README.md
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
