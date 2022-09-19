const routes=[
    {path:'/home',component:home},
    {path:'/department',component:department},
    {path:'/product', component:product},
    {path: '/order', component:order},
    {path:'/menu', component:menu}

]

const router= VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes // short for `routes: routes`
})

const app = Vue.createApp({})
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')
