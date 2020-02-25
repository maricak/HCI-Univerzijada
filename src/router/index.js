import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Profile from '../components/Profile'
import Student from '../components/Student'
import Organizer from '../components/Organizer'
import Belgrade from '../components/Belgrade'
import Blog from '../components/Blog'
import CreateMatch from '../components/CreateMatch'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'home', component: Login },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/profile', name: 'profile', component: Profile },
    { path: '/student', name: 'student', component: Student },
    { path: '/organizer', name: 'organizer', component: Organizer },
    { path: '/belgrade', name: 'belgrade', component: Belgrade },
    { path: '/blog/:id', name: 'blog', component: Blog },
    { path: '/creatematch', name: 'craetematch', component: CreateMatch },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
