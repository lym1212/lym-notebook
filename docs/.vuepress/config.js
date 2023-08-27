module.exports = {
  base: '/lym-notebook/',
  title: "lym's notebook",
  theme: '@vuepress/theme-default',
  description: "lym's notebook",
  themeConfig: {
    // logo
  	logo: '/img/logo.jpg',
    // 导航栏
    nav: [
      {
        text: '日常踩坑',
        link: '/trap/'
      },
      {
        text: '碎片记录',
        link: '/piece/'
      },
      {
        text: '学习记录',
        link: '/study/',
        items: [
          { text: '工具', link: '/study/tool.md' },
          { text: 'ES6', link: '/study/js/Set和Map.md' }
        ]
      },
      {
        text: '看书记录',
        link: '/book/',
        items: [
          { text: 'Vuejs实战笔记', link: '/book/Vuejs实战笔记.md' }
        ]
      },
      { text: 'Github', link: 'https://github.com/lym1212/lym-notebook', target:'_blank' }
    ],
    // 侧边栏
    sidebar: {
      '/trap/': [
        {
          title: '踩坑记录',
          sidebarDepth: 3,
          children: [
            'elementUI', 'css', 'echarts', 'uniapp', 'vue'
          ]
        }
      ],
      '/piece/': [
        {
          title: '碎片记录',
          sidebarDepth: 3,
          children: [
            'git', 'vuepress', 'nvm'
          ]
        }
      ],
      '/study/': [
        {
          title: '学习记录',
          sidebarDepth: 3,
          children: [
            'tool', 'js/Set和Map'
          ]
        }
      ],
      '/book/': [
        {
          title: '看书记录',
          sidebarDepth: 3,
          children: [
            'Vuejs实战笔记'
          ]
        }
      ]
    },
    lastUpdated: true,
    smoothScroll: true,
    search: false
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': 'public'
      }
    }
  },
  markdown: {
    // lineNumbers: true // 行号
  }
}