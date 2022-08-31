import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue"
import FormPage from "@/views/FormPage.vue"
import MessageHistoryPage from "@/views/MessageHistoryPage.vue"
const routes = [
    {
        path:"/",
        name:"home",
        component:HomePage
    },
    {
        path:"/form",
        name:"form",
        component:FormPage
    },
    {
        path:"/message",
        name:"message",
        component:MessageHistoryPage
    }

]
const router = createRouter({
    routes,
    history:createWebHashHistory()
})
export default router 