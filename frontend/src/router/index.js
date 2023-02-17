import { createRouter, createWebHistory } from 'vue-router'

// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: () => import('../components/homePage.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'blank' },
    component: () => import('../components/login.vue')
  },
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../components/intakeForm.vue'),
    beforeEnter: (to, from, next) => {
      let user = sessionStorage.getItem('login');

      let json = JSON.parse(user);

      if (!user) {
        alert('Unauthorized access. Redirecting to Dashboard');
        next({ path: '/' })
      } else {
        if (json.role === 'editor') {
          next()
        } else {
          alert(`You don't have the role to edit this. Redirecting to Dashboard`);
          next({ path: '/' })
        }
      }
    }
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../components/findClient.vue')
  },
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../components/updateClient.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../components/eventForm.vue'),
    beforeEnter: (to, from, next) => {
      let user = sessionStorage.getItem('login');

      let json = JSON.parse(user);

      if (!user) {
        alert('Unauthorized access. Redirecting to Dashboard');
        next({ path: '/' })
      } else {
        if (json.role === 'editor') {
          next()
        } else {
          alert(`You don't have the role to edit this. Redirecting to Dashboard`);
          next({ path: '/' })
        }
      }
    }
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findEvents.vue')
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../components/eventDetails.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const protectedRoutes = ['/intakeform', '/eventform']; 
//   if (protectedRoutes.includes(to.path)) {
//     return next ('/unauthorised');
//   }
//   else {
//     return next ();
//   }
// })

export default router
