import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import Singin from '@/views/Singin.vue'
import Admin from '@/views/Admin.vue';
import Course from '@/views/CourseEdit.vue'

import { getAuth } from 'firebase/auth'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            privado: true
        }

    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
            privado: true
        }

    },
    {
        path: '/admin/:id',
        name: 'adminID',
        component: Course,
        props: true,
        meta: {
            privado: true
        }

    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/sing-in',
        name: 'sing-in',
        component: Singin
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const auth = getAuth()
    // console.log(auth)
    let user = auth.currentUser
    // console.log(user)

    let privateUrl = to.meta.privado

    if (privateUrl && !user) {
        next('/login')
    }
    else if (privateUrl == undefined && user) {
        next('/')
    }
    else {
        next()
    }

})



export default router
