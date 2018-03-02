import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import Index from '../pages/index';
const Login = () => import('../pages/login');
const FillBill = () => import('../pages/fillBill');

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: {
      auth: true,
    },
    component: Index,
  },
  {
    path: '/fillBill',
    name: 'FillBill',
    meta: {
      auth: true,
    },
    component: FillBill,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
]


if (window.localStorage.getItem('token')) {
  let username = window.localStorage.getItem('username')
  let token = window.localStorage.getItem('token')
  store.commit('login', {username,token})
}

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.state.token) {
      next();
    } else {
      next({path: '/login'});
    }
  } else {
    next();
  }
});

export default router;
