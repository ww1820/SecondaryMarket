import mockjs from 'mockjs';

const block = [
  '27',
  '26',
  '25',
  '24',
  '23',
  '22',
  '21',
  '20',
  '19',
  '18',
];

const titles = [
  '27',
  '26',
  '25',
  '24',
  '23',
  '22',
  '21',
  '20',
  '19',
  '18',
];
const avatars = [
  '../../../src/img/B.jpg', 
  '../../../src/img/T.jpg', 
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const avatars2 = [
  'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const descB = [
  '13秒前',
  '17秒前',
  '19秒前',
  '25秒前',
  '36秒前',
  '38秒前',
  '45秒前',
  '1分25秒前',
  '1分36秒前',
  '1分38秒前',
];

const descT = [
  '13秒前',
  '17秒前',
  '19秒前',
  '25秒前',
  '36秒前',
  '38秒前',
  '45秒前',
  '1分25秒前',
  '1分36秒前',
  '1分38秒前',

];
const Peer = [
  'peer5',
  'peer1',
  'peer0',
  'peer4',
  'peer7',
  'peer4',
  'peer6',
  'peer3',
  'peer1',
  'peer4',
];

const txCnt = [
  '1个交易',
  '1个交易',
  '1个交易',
  '1个交易',
  '1个交易',
  '1个交易',
  '1个交易',
  '1个交易',
  '1个交易',
  '1个交易',
]

const txid = [
  '0x197d9ffe7b...',
  '0x10dc88f5e2...',
  '0x762ca8992b...',
  '0xf94615b42a...',
  '0xcd45138902...',
  '0xbfde137285...',
  '0xad0becaaa2...',
  '0x3e207e49a6...',
  '0xe864337872...',
  '0x333d0107d1...',
]

const from = [
  '0xf3eeb9a27dbf542...',
  '0x1ebc48e0020bd4a...',
  '0xf3eeb9a27dbf542...',
  '0xf3eeb9a27dbf542...',
  '0xf3eeb9a27dbf542...',
  '0xf3eeb9a27dbf542...',
  '0x34a27b3640d302d...',
  '0xf3eeb9a27dbf542...',
  '0x1ebc48e0020bd4a...',
  '0x530d5539131c52b...',
  
]

const to = [
  '0x95cee155a405c45...',
  '0xf3eeb9a27dbf542...',
  '0x1ebc48e0020bd4a...',
  '0x1ebc48e0020bd4a...',
  '0xa5b0f0d4d586f20...',
  '0x17a78854eb9de9f...',
  '0xf3eeb9a27dbf542...',
  '0x1ebc48e0020bd4a...',
  '0x1ebc48e0020bd4a...',
  '0xed1ef6d67fa61fe...',
]

const tx = [
  {
    'type' : '买入',
    'to' : '0x95cee155a405c45...',
    'from' : '0xf3eeb9a27dbf542...',
    'amount' : '7',
  },
  {
    'type' : '买入',
    'to' : '0x1ebc48e0020bd4a...',
    'from' : '0xf3eeb9a27dbf542...',
    'amount' : '8',
  },
  {
    'type' : '卖出',
    'to' : '0xf3eeb9a27dbf542...',
    'from' : '0xed1ef6d67fa61fe...',
    'amount' : '5',
  },
  {
    'type' : '买入',
    'to' : '0xed1ef6d67fa61fe...',
    'from' : '0xf3eeb9a27dbf542...',
    'amount' : '7',
  },
  {
    'type' : '卖出',
    'to' : '0xf3eeb9a27dbf542...',
    'from' : '0xa5b0f0d4d586f20...',
    'amount' : '6',
  },
  {
    'type' : '买入',
    'to' : '0x95cee155a405c45...',
    'from' : '0xf3eeb9a27dbf542...',
    'amount' : '11',
  },
  {
    'type' : '买入',
    'to' : '0x95cee155a405c45...',
    'from' : '0xf3eeb9a27dbf542...',
    'amount' : '6',
  },

]

// const amount = [
//   '289',
//   '',
//   '',
//   '',
//   '',
//   '',
//   '',
//   '',
//   '',

// ]

function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      Peer: Peer[i % 10],
      txcnt: txCnt[i % 10],
      blocknum: block[i % 10],
      title: titles[i % 10],
      txid: txid[i % 10],
      txid2: txid[(i+5) % 10],
      from: from[i % 10],
      tx : tx[i % 7],
      to: to[i % 10],
      Bk: avatars[0],
      Tx: avatars[1],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescriptionB: descB[i % 10],
      subDescriptionT: descT[i % 10],
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
          id: 'member1',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
          id: 'member2',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
          id: 'member3',
        },
      ],
    });
  }

  return list;
}

let sourceData;

function getFakeList(req, res) {
  const params = req.query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);
  sourceData = result;
  return res.json(result);
}

function postFakeList(req, res) {
  const { /* url = '', */ body } = req;
  // const params = getUrlParams(url);
  const { method, id } = body;
  // const count = (params.count * 1) || 20;
  let result = sourceData;

  switch (method) {
    case 'delete':
      result = result.filter(item => item.id !== id);
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.id === id) {
          result[i] = Object.assign(item, body);
        }
      });
      break;
    case 'post':
      result.unshift({
        body,
        id: `fake-list-${result.length}`,
        createdAt: new Date().getTime(),
      });
      break;
    default:
      break;
  }

  return res.json(result);
}

const getNotice = [
  {
    id: 'xxx1',
    title: titles[0],
    logo: avatars[0],
    description: '那是一种内在的东西，他们到达不了，也无法触及的',
    updatedAt: new Date(),
    member: '科学搬砖组',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: titles[1],
    logo: avatars[1],
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    updatedAt: new Date('2017-07-24'),
    member: '全组都是吴彦祖',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: titles[2],
    logo: avatars[2],
    description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    updatedAt: new Date(),
    member: '中二少女团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: titles[3],
    logo: avatars[3],
    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    updatedAt: new Date('2017-07-23'),
    member: '程序员日常',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: titles[4],
    logo: avatars[4],
    description: '凛冬将至',
    updatedAt: new Date('2017-07-23'),
    member: '高逼格设计天团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: titles[5],
    logo: avatars[5],
    description: '生命就像一盒巧克力，结果往往出人意料',
    updatedAt: new Date('2017-07-23'),
    member: '骗你来学计算机',
    href: '',
    memberLink: '',
  },
];

const getActivities = [
  {
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: '曲丽丽',
      avatar: avatars2[0],
    },
    group: {
      name: '高逼格设计天团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: '付小小',
      avatar: avatars2[1],
    },
    group: {
      name: '高逼格设计天团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-3',
    updatedAt: new Date(),
    user: {
      name: '林东东',
      avatar: avatars2[2],
    },
    group: {
      name: '中二少女团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-4',
    updatedAt: new Date(),
    user: {
      name: '周星星',
      avatar: avatars2[4],
    },
    project: {
      name: '5 月日常迭代',
      link: 'http://github.com/',
    },
    template: '将 @{project} 更新至已发布状态',
  },
  {
    id: 'trend-5',
    updatedAt: new Date(),
    user: {
      name: '朱偏右',
      avatar: avatars2[3],
    },
    project: {
      name: '工程效能',
      link: 'http://github.com/',
    },
    comment: {
      name: '留言',
      link: 'http://github.com/',
    },
    template: '在 @{project} 发布了 @{comment}',
  },
  {
    id: 'trend-6',
    updatedAt: new Date(),
    user: {
      name: '乐哥',
      avatar: avatars2[5],
    },
    group: {
      name: '程序员日常',
      link: 'http://github.com/',
    },
    project: {
      name: '品牌迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
];

function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
}

export default {
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'POST /api/fake_list': postFakeList,
  'GET /api/captcha': getFakeCaptcha,
};
