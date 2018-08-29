import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Dashboard from '@/views/Dashboard'
import Celulas from './views/Celulas/Index'
import CelulasNew from './views/Celulas/New'
import CelulasEdit from './views/Celulas/Edit'

import Sectores from './views/Sectores/Index'
import SectoresNew from './views/Sectores/New'
import SectoresEdit from './views/Sectores/Edit'

import SubSectores from './views/SubSectores/Index'
import SubSectoresNew from './views/SubSectores/New'
import SubSectoresEdit from './views/SubSectores/Edit'

import Semanal from './views/Reportes/Semanal'
import Cuatrimestral from './views/Reportes/Cuatrimestral'
import AmigosAnotados from './views/Reportes/AmigosAnotados'
import Amigos from './views/Reportes/Amigos'

Vue.use(Router)

export default new Router({
  routes:
  [
    { path: '/', name:'Index', component: Login },
    { path: '/Semanal', name:'Semanal', component: Semanal },
    { path: '/Navbar', name:'Navbar', component: Navbar },
    { path: '/Footer', name:'Footer', component: Footer },
    { path: '/Dashboard', name:'Dashboard', component: Dashboard },
    { path: '/Sectores', name:'Sectores', component: Sectores },
    { path: '/SectoresNew', name:'SectoresNew', component: SectoresNew },
    { path: '/SectoresEdit/:id', name:'SectoresEdit', component: SectoresEdit, props: true },
    { path: '/SubSectores', name:'SubSectores', component: SubSectores },
    { path: '/SubSectoresNew/:id', name:'SubSectoresNew', component: SubSectoresNew, props: true},
    { path: '/SubSectoresEdit/:id', name:'SubSectoresEdit', component: SubSectoresEdit, props: true },
    { path: '/Celulas', name:'Celulas', component: Celulas },
    { path: '/CelulasNew', name:'CelulasNew', component: CelulasNew },
    { path: '/CelulasEdit/:id', name:'CelulasEdit', component: CelulasEdit, props: true },
    { path: '/Cuatrimestral', name:'Cuatrimestral', component: Cuatrimestral },
    { path: '/AmigosAnotados', name:'AmigosAnotados', component: AmigosAnotados},
    { path: '/Amigos', name:'Amigos', component: Amigos}
  ],
  mode:'history'
})
