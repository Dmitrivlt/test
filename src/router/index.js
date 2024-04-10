import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/pages/Index'
import Users from "@/pages/Users";
import Games from "@/pages/Games";
import User from "@/pages/User";
import Game from "@/pages/Game";
import Giveaways from "@/pages/Giveaways";
import Giveaway from "@/pages/Giveaway";
import Tickets from "@/pages/Tickets";
import Ticket from "@/pages/Ticket";
import Bots from "@/pages/Bots";
import Items from "@/pages/Items";
import Online from "@/pages/Online";
import Comission from "@/pages/Comission";
import Settings from "@/pages/Settings";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/users/:id',
    name: 'User',
    component: User
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/games/:id',
    name: 'Game',
    component: Game
  },
  {
    path: '/giveaways',
    name: 'Giveaways',
    component: Giveaways
  },
  {
    path: '/giveaways/:id',
    name: 'Giveaway',
    component: Giveaway
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets
  },
  {
    path: '/tickets/:id',
    name: 'Ticket',
    component: Ticket
  },
  {
    path: '/bots',
    name: 'Bots',
    component: Bots
  },
  {
    path: '/items',
    name: 'Items',
    component: Items
  },
  {
    path: '/online',
    name: 'Online',
    component: Online
  },
  {
    path: '/comission',
    name: 'Comission',
    component: Comission
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router