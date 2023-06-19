module.exports = {
  title: "lym's notebook",
  description: "lym's notebook",
  themeConfig: {
    sidebar: [
      {
        title: '指南',
        children: [
          '/',
          '/a.md',
          '/b.md'
        ]
      }
    ],
    nav: [
      { text: '指南', link: '/' },
      { text: '配置', link: '/config.md' },
      { text: 'Github', link: 'https://github.com/lym1212/docs' }
    ]
  }
}