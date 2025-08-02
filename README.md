# YY的YouTube视频下载网站

一个基于 Next.js 和 Netlify Functions 的 YouTube 视频下载工具，支持视频信息解析、实时下载进度显示和历史记录管理。

## 🌟 主要功能

- ✅ **视频信息解析**：输入 YouTube 链接，自动解析视频详细信息
- ✅ **信息展示**：表格形式展示视频标题、描述、封面、上传日期等
- ✅ **视频下载**：支持下载视频到本地设备
- ✅ **实时进度**：下载过程中显示实时进度条
- ✅ **历史记录**：保存并管理下载历史记录
- ✅ **响应式设计**：适配桌面、平板、手机等各种设备
- ✅ **用户友好界面**：简洁美观的现代化 UI 设计

## 🛠️ 技术栈

### 前端
- **Next.js 14** - React 框架
- **React 18** - 用户界面库
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化 CSS 框架
- **响应式设计** - 移动端优先

### 后端
- **Netlify Functions** - 无服务器函数
- **Node.js** - 运行时环境
- **ytdl-core** - YouTube 视频下载核心库

### 部署
- **Netlify** - 静态网站托管和无服务器函数

## 📁 项目结构

```
Youtube-download/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页面
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── VideoAnalyzer.tsx  # 视频分析器
│   ├── VideoInfoDisplay.tsx # 视频信息展示
│   ├── DownloadProgress.tsx # 下载进度
│   └── HistoryPanel.tsx   # 历史记录面板
├── netlify/functions/     # Netlify 无服务器函数
│   ├── analyze.js         # 视频信息解析 API
│   └── download.js        # 视频下载 API
├── package.json           # 项目依赖
├── next.config.js         # Next.js 配置
├── tailwind.config.js     # Tailwind 配置
├── netlify.toml          # Netlify 部署配置
└── README.md             # 项目说明
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发

```bash
npm run dev
```

访问 `http://localhost:3000` 查看应用。

### 3. 构建项目

```bash
npm run build
```

## 📱 使用方法

### 解析视频
1. 在输入框中粘贴 YouTube 视频链接
2. 点击"解析视频"按钮
3. 等待解析完成，查看视频详细信息

### 下载视频
1. 解析成功后，点击"下载视频"按钮
2. 观察实时下载进度条
3. 下载完成后，文件自动保存到下载文件夹

### 查看历史
1. 点击"查看历史记录"按钮
2. 浏览之前的下载记录
3. 查看成功/失败统计信息

## 🌐 部署到 Netlify

### 方法一：GitHub 连接（推荐）

1. 将代码推送到 GitHub 仓库
2. 登录 [Netlify](https://app.netlify.com/)
3. 点击 "New site from Git"
4. 选择你的 GitHub 仓库
5. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `out`
6. 点击 "Deploy site"

### 方法二：拖拽部署

1. 运行构建命令：`npm run build`
2. 将 `out` 文件夹拖拽到 Netlify 部署页面

### 环境变量（可选）

如果需要配置额外功能，可以在 Netlify 控制台添加环境变量：

```
NODE_VERSION=18
```

## 📋 支持的视频格式

- 支持所有 YouTube 公开视频
- 自动选择最佳质量（带音频和视频）
- 输出格式：MP4

## ⚠️ 重要提醒

### 法律声明
- 请遵守 YouTube 服务条款
- 下载的视频仅供个人学习和欣赏使用
- 请勿用于商业用途或二次分发
- 尊重原创作者的版权和知识产权

### 技术限制
- Netlify Functions 有 10 秒执行时间限制
- 大文件下载可能会超时
- 某些地区可能无法访问特定视频

## 🛠️ 故障排除

### 常见问题

**Q: 解析失败怎么办？**
A: 请检查：
- YouTube 链接是否正确
- 视频是否为公开状态
- 网络连接是否正常

**Q: 下载速度很慢？**
A: 下载速度取决于：
- 视频文件大小
- 网络连接速度
- 服务器负载情况

**Q: 下载失败？**
A: 可能原因：
- 视频太大导致超时
- 视频有地区限制
- 网络连接中断

### 开发调试

```bash
# 查看详细错误信息
npm run dev

# 检查 Netlify Functions 日志
netlify dev
```

## 📈 功能路线图

- [ ] 支持更多视频平台
- [ ] 批量下载功能
- [ ] 视频格式选择
- [ ] 下载队列管理
- [ ] 用户账户系统
- [ ] 云端存储集成

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 👨‍💻 作者

YY - 初学者友好的 YouTube 下载工具

---

**注意**：本项目仅供学习和个人使用，请遵守相关法律法规和平台服务条款。