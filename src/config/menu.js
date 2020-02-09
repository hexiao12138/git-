const menu = [
  {
    title: 'home',
    icon: 'home',
    path: '/'
  },
  {
    title: 'products',
    icon: 'appstore',
    path: '/products',
    children: [
      {
        title: 'catetory',
        icon: 'bars',
        path: '/category'
      },{
        title: 'product',
        icon: 'tool',
        path: '/product'
      }
    ]
  },
  {
    title: 'user',
    icon: 'user',
    path: '/user'
  },
  {
    title: 'role',
    icon: 'safety',
    path: '/role'
  },
  {
    title: 'charts',
    icon: 'area-chart',
    path: '/charts',
    children: [
      {
        title: 'bar',
        icon: 'bar-chart',
        path: '/bar'
      },
      {
        title: 'line',
        icon: 'line-chart',
        path: '/line'
      },
      {
        title: 'pie',
        icon: 'pie-chart',
        path: '/pie'
      }
    ]
  }
];

export default menu;