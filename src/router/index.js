import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import NotFound from '@/views/404'
import Home from '@/views/Home'
import User from '@/views/Sys/User'
import Dept from '@/views/Sys/Dept'
import Role from '@/views/Sys/Role'
import Menu from '@/views/Sys/Menu'
import Log from '@/views/Sys/Log'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: '首页',
      component: Home,
      children: [
        { path: '/user', component: User, name: '用户管理' },
        { path: '/dept', component: Dept, name: '机构管理' },
        { path: '/role', component: Role, name: '角色管理' },
        { path: '/menu', component: Menu, name: '菜单管理' },
        { path: '/log', component: Log, name: '日志管理' }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    }
    ,{
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})

