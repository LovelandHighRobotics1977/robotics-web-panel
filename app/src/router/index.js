import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "",
            redirect: "/Home"
        },
        {
            path: "/Home",
            name: "Home",
            component: require("@/pages/Home").default,
        },
        {
            path: "/Gallery",
            name: "Gallery",
            component: require("@/pages/Gallery").default
        },
        {
            path: "/Sponsors",
            name: "Sponsors",
            component: require("@/pages/Sponsors").default
        },
        {
            path: "/Contact",
            name: "Contact",
            component: require("@/pages/Contact").default
        },
        {
            path: "/Links",
            name: "Links",
            component: require("@/pages/Links").default
        },
    ]
});