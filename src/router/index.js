import Vue from 'vue';
import VueRouter from 'vue-router';
import Meetups from '@/components/Meetup/Meetups.vue'
import CreateMeetup from '@/components/Meetup/CreateMeetup.vue'
import Profile from '@/components/User/Profile.vue'
import Signin from '@/components/User/Signin.vue'
import Signup from '@/components/User/Signup.vue'
import Home from '@/components/Home.vue'
import SingleMeetup from '@/components/Meetup/SingleMeetup.vue'
import authguard from './auth-guard'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Single/:id',
    name: 'SingleMeetup',
    props:true,
    component: SingleMeetup,
  },
  {
    path: '/CreateMeetup',
    name: 'CreateMeetup',
    component: CreateMeetup,
    beforeEnter:authguard
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/Signin',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/Meetups',
    name: 'Meetups',
    component: Meetups,
  },
  

];

 const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes,
 });
 export default router;
