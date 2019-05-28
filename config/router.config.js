export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // // dashboard
      { path: '/', redirect: '/homepage', authority: ['admin', 'user'] },
      // {
      //   path: '/index',
      //   icon: 'home',
      //   name: 'index',
      //   component: './List/BasicList',
      // },
      // // Gamelist
      // {
      //   path: '/list',
      //   icon: 'bars',
      //   name: 'gamelist',
      //   routes: [
      //     {
      //       path: '/list/basic-list',
      //       name: 'goodslist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'mobilegames',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           redirect: '/list/search/articles',
      //         },
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //         {
      //           path: '/list/search/applications',
      //           name: 'applications',
      //           component: './List/Applications',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // // Transaction
      // {
      //   name: 'transaction',
      //   icon: 'dollar',
      //   path: '/editor',
      //   routes: [
      //     {
      //       path: '/editor/flow',
      //       name: 'flow',
      //       component: './Editor/GGEditor/Flow',
      //     },
      //     {
      //       path: '/editor/mind',
      //       name: 'mind',
      //       component: './Editor/GGEditor/Mind',
      //     },
      //     {
      //       path: '/editor/koni',
      //       name: 'koni',
      //       component: './Editor/GGEditor/Koni',
      //     },
      //   ],
      // },
      //index
      {
        name: '首页',
        icon: 'home',
        path: '/homepage',
        authority: ['guest','admin','user'],
        component: './Dashboard/Analysis',
      },
      // Gamelist
      {
        path: '/list',
        icon: 'bars',
        name: '商品分类',
        authority: ['guest','admin','user'],
        routes: [
          {
            path: '/list/gameAccount',
            name: '游戏账号',
            component: './List/BasicList',
          },
          {
            path: '/list/security',
            name: '证券',
            component: './List/CardList',
          },
          {
            path: '/list/virtualcurrency',
            name: '虚拟货币',
            component: './List/CardList',
          },
          {
            path: '/list/others',
            name: '其他',
            component: './List/CardList',
          },
        ],
      },
      // Transaction
      {
        name: '交易',
        icon: 'transaction',
        path: '/transaction',
        // component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/transaction/allTransaction',
            name: '全部交易',
            authority: ['guest','admin','user'],
            component: './List/BasicList',
          },
          {
            path: '/transaction/myTransaction',
            name: '我的交易',
            authority: ['admin','user'],
            exact: true,
            component: './Transaction/Mytransaction',
          },
        ],
      },
      // Account
      {
        path: '/account/settings',
        icon: 'user',
        name: 'settings',
        component: './Account/Settings/Info',
        routes: [
          {
            path: '/account/settings',
            redirect: '/account/settings/base',
          },
          {
            path: '/account/settings/base',
            component: './Account/Settings/BaseView',
          },
          {
            path: '/account/settings/security',
            component: './Account/Settings/SecurityView',
          },
          {
            path: '/account/settings/binding',
            component: './Account/Settings/BindingView',
          },
          {
            path: '/account/settings/notification',
            component: './Account/Settings/NotificationView',
          },
        ],
      },
    ],
  },
];
