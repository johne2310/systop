const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'CPU',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'sysinfo',
        name: 'SysInfo',
        component: () => import('pages/SysInfo')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('pages/Settings')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
