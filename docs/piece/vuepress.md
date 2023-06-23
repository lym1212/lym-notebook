# VuePress部署

```shell
# 初始化
yarn init # npm init

# 安装依赖
yarn add -D vuepress # npm install -D vuepress
```

## 文件夹结构

```
.
├── docs
│   ├── .vuepress (存放全局的配置、组件、静态资源等)
│   │   ├── public
│   │   └── config.js (配置文件的入口文件)
│   └── README.md
└── package.json
```

## package.json

```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```

## .vuepress/config.js配置

```javascript
module.exports = {
  base: '/lym-notebook/',
  title: "lym's notebook",
  description: "lym's notebook",
  themeConfig: {
  	// logo
  	logo: '/img/logo.jpg',
    // 导航
    nav: [
      {
        text: '碎片记录',
        // 下拉列表
        // items还可以嵌套items
        items: [
          { text: 'Git', link: '/piece/git.md' },
          { text: 'Vuepress', link: '/piece/vuepress.md' }
        ]
      },
      {
        text: '学习记录',
        link: '/'
      },
      { text: 'Github', link: 'https://github.com/lym1212/lym-notebook', target:'_blank' }
    ]
  }
}
```

## GitHub Pages部署

- 在根目录创建`deploy.sh`

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# base路径: /<REPO>/
git push -f git@github.com:lym1212/lym-notebook.git master:gh-pages

cd -
```

- 添加命令

```json
"scripts": {
    "deploy": "bash deploy.sh"
}
```

- 运行命令

```shell
npm run deploy
```

## 设置主题

```shell
npm install @vuepress/theme-blog -D
```

## YAML front matter

- Frontmatter 必须在 Markdown 文件的顶部，并且被包裹在一对三短划线中间

## 热更新

- 修改dev命令

```json
"docs:dev": "vuepress dev docs --temp .temp"
```

