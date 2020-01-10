import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'

Vue.use(Router)

 const router = new Router({
  routes: [
    {path: '/home', 
    component: Home,
    redirect:'/welcome',
    children:[
      {path: '/welcome', component:Welcome},
      {path: '/users', component:Users}
  ]
},
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login}
  ]
})

//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  // to表示将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行    next('/login')强制跳转

  if (to.path === '/login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router