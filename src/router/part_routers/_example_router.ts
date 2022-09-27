export default [
  {
    path: '/example',
    meta: {
      layout: 'content',
      requiresAuth: true,
    },
    component: () => import('@/views/_example/ExampleIndex.vue'),
    children: [
      {
        path: '',
        name: 'example-index',
        meta: {
          layout: 'content',
          requiresAuth: true,
          breadcrumb: [{ name: 'Главная', link: 'index' }, { name: 'Пример разделы' }],
        },
        component: () => import('@/views/_example/ExampleParts.vue'),
      },
      {
        path: 'table',
        name: 'example-table',
        meta: {
          layout: 'content',
          requiresAuth: true,
          breadcrumb: [
            { name: 'Главная', link: 'index' },
            { name: 'Разделы', link: 'example-index' },
            { name: 'Страница с таблицей' },
          ],
        },
        component: () => import('@/views/_example/ExamplePageTable.vue'),
      },
      {
        path: 'empty',
        name: 'example-empty',
        meta: {
          layout: 'content',
          requiresAuth: true,
          breadcrumb: [
            { name: 'Главная', link: 'index' },
            { name: 'Пример разделы', link: 'example-index' },
            { name: 'Пустая страница' },
          ],
        },
        component: () => import('@/views/_example/ExamplePageEmpty.vue'),
      },
    ],
  },
]
