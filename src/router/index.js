import Vue from 'vue';
import VueRouter from 'vue-router';

import Series from '../components/Series.vue';
import Show from '../components/Show.vue'
import Editar from '../components/Shows/Editar.vue'


Vue.use(VueRouter);

export default new VueRouter ({
    routes: [
        {
            path: '/',
            component: Series
        },
        {
            path: '/shows/:id',
            component: Show
        },
        {
            path: '/shows/:id/editar',
            component: Editar,
            props: true
        }

    ]
})