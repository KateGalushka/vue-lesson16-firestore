import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssignmentsView from '../views/AssignmentsView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/drivers',
        name: 'drivers',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/DriversView.vue'),
		  children: [
				{
					path: 'edit/:driverId?',
					name: 'driverEditor',
					props: true,
					component: () => import('../views/DriverEditorView.vue'),
				}
			]
    },
    {
        path: '/busses',
        name: 'busses',
		 component: () => import(/* webpackChunkName: "about" */ '../views/BussesView.vue'),
		 children: [
			 {
				 path: 'edit/:busId?',
				 name: 'busEditor',
				 props: true,
				 component: () => import('../views/BusEditorView.vue'),
			 }
		 ]
    },
    {
        path: '/assignments',
        name: 'assignments',
		 component: AssignmentsView,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
