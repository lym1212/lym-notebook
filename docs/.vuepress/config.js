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
        link: '/trap/1.md'
      },
      {
        text: '碎片记录',
        link: '/piece/git.md'
        // 下拉列表
        // items还可以嵌套items
        // items: [
        //   { text: 'Git', link: '/piece/git.md' },
        //   { text: 'Vuepress', link: '/piece/vuepress.md' }
        // ]
      },
      {
        text: '学习记录',
        link: '/study/'
      },
      { text: 'Github', link: 'https://github.com/lym1212/lym-notebook', target:'_blank' }
    ],
    // 侧边栏
    sidebar: {
      '/trap/': [
        {
          title: '日常踩坑',
          sidebarDepth: 3,
          children: [
            '1'
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

      ]
    },
    lastUpdated: true,
    smoothScroll: true
  }
}