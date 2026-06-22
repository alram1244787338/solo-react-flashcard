# 单词记忆卡

单词卡片翻转背诵，正面英文反面中文，记住移除、没记住复习，键盘快捷键操作。

## 技术栈

- React 18
- webpack 5
- CSS 3D transform

## 目录结构

```
.
├── public/
│   └── index.html              # HTML 模板
├── src/
│   ├── components/             # 组件目录
│   │   ├── CardControls.jsx    # 翻页+记忆按钮控制
│   │   ├── FlashCard.jsx       # 翻转卡片组件
│   │   └── ProgressBar.jsx     # 学习进度条
│   ├── data/
│   │   └── words.js            # 词库数据（30 个常用英语单词）
│   ├── styles/                 # 样式目录
│   │   ├── app.css
│   │   ├── cardcontrols.css
│   │   ├── flashcard.css
│   │   ├── global.css
│   │   └── progressbar.css
│   ├── utils/                  # 工具函数目录
│   │   ├── keyboard.js         # 键盘事件处理
│   │   └── shuffle.js          # 数组随机排序
│   ├── App.jsx                 # 主应用组件
│   └── index.jsx               # 应用入口
├── babel.config.json           # Babel 配置
├── package.json
├── webpack.common.js           # webpack 公共配置
├── webpack.dev.js              # 开发环境配置
└── webpack.prod.js             # 生产环境配置
```

## 安装运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打包生产版本
npm run build
```

开发服务器启动后访问 http://localhost:8080

## 怎么用

### 翻卡背单词
- 点击卡片查看中文释义（CSS 3D 翻转效果）
- 再次点击翻回英文

### 标记记住/没记住
- **记住了**：当前卡片从复习队列中移除，进度 +1
- **没记住**：当前卡片移到队列末尾，后续会再次出现

### 键盘快捷键

| 按键 | 功能 |
|------|------|
| `Enter` | 翻转卡片 |
| `←` | 上一张 |
| `→` | 下一张 |
| `R` | 标记为已记住 |
| `F` | 标记为没记住 |
