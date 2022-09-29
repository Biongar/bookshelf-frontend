export default [
  {
    path: '/bookshelf',
    meta: {
      layout: 'content',
      requiresAuth: true,
    },
    component: () => import('@/views/bookshelf/BookshelfIndexView.vue'),
    children: [
      {
        path: '',
        name: 'bookshelf-index',
        meta: {
          layout: 'content',
          requiresAuth: true,
          breadcrumb: [{ name: 'Главная', link: 'index' }, { name: 'Книжный шкаф' }],
        },
        component: () => import('@/views/bookshelf/BookshelfListView.vue'),
      },
      {
        path: 'book/:id',
        name: 'bookshelf-detail',
        meta: {
          layout: 'content',
          requiresAuth: true,
          breadcrumb: [
            { name: 'Главная', link: 'index' },
            { name: 'Книжный шкаф', link: 'bookshelf-index' },
            { name: 'Рецензия' },
          ],
        },
        component: () => import('@/views/bookshelf/BookshelfDetailView.vue'),
      },
      {
        path: 'book/create',
        name: 'bookshelf-create',
        meta: {
          layout: 'content',
          requiresAuth: true,
          breadcrumb: [
            { name: 'Главная', link: 'index' },
            { name: 'Книжный шкаф', link: 'bookshelf-index' },
            { name: 'Создание рецензии' },
          ],
        },
        component: () => import('@/views/bookshelf/BookshelfCreateView.vue'),
      },
      {
        path: 'book/update/:id',
        name: 'bookshelf-update',
        meta: {
          layout: 'content',
          requiresAuth: true,
          breadcrumb: [
            { name: 'Главная', link: 'index' },
            { name: 'Книжный шкаф', link: 'bookshelf-index' },
            { name: 'Изменение рецензии' },
          ],
        },
        component: () => import('@/views/bookshelf/BookshelfUpdateView.vue'),
      },
    ],
  },
]
