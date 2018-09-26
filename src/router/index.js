import Vue from 'vue'
import Router from 'vue-router'
import Journey from '@/pages/Journey'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Journey',
      component: Journey
    }
  ],
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  }
})
