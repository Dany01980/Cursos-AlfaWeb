<template>
    <v-app>
        <NavBar
            :email="email"
            :privateRoute="ifPrivateRoute">
        </NavBar>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { mapState, mapActions } from "vuex";
import NavBar from "@/components/NavBar.vue";
export default {
    name: "App",

    data: () => ({
        //
    }),
    computed: {
        ...mapState(["email"]),
        ifPrivateRoute() {
            if (this.$route.meta.privado) return true;
            return false;
        },
    },
    methods: {
        ...mapActions(["add_datauser"]),
    },

    components: {
        NavBar,
    },
    created() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) return this.add_datauser(user.email);
        });
    },
};
</script>
<style>
body {
    font-family: "Source Code Pro", monospace;
}
h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: "Source Code Pro", monospace;
}
</style>
