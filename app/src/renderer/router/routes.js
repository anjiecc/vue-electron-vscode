
const Login = resolve => {
  import('@/views/login').then(module => {
    resolve(module)
  })
}

// const Index = resolve => {
//   import('@/views/index/index').then(module => {
//     resolve(module)
//   })
// }

const Folder = resolve => {
  import('@/views/files/folder').then(module => {
    resolve(module)
  })
}

const Code = resolve => {
  import('@/views/code/code').then(module => {
    resolve(module)
  })
}

const routes = [
  /* {
    path: '/computer',
    name: 'index',
    component: Index,
    children: [{
      path: '/computer/:id',
      name: 'folder',
      component: Folder
    }]
  }, */
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    redirect: '/computer'
  }, {
    path: '/code',
    name: 'code',
    component: Code
  },
  {
    path: '/folder',
    name: 'folder',
    component: Folder
  }
]

export default routes
