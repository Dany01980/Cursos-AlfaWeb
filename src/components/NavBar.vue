<template>
    <nav>
        <v-toolbar
            flat
            color="deep-purple-4"
        >
        <v-app-bar
            color="deep-purple"
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <span>Cursos AlfaWeb</span>
                
            </v-toolbar-title>
            
            <v-spacer></v-spacer>
            <span
                v-if="privateRoute"
                class="mx-8"
            >
                {{ email[0] }}
            </span>
            <v-btn
                v-if="privateRoute"
                @click="logout"
                color="primary"
            >
                <span>Cerrar Sesion</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
            </v-app-bar>
        </v-toolbar>
        <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
            class="black"
        >
            <v-list dense>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    link
                    :to="item.link"
                >
                    <v-list-item-icon>
                        <v-icon class="white--text">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import { mapActions } from "vuex";
import { getAuth, signOut } from "firebase/auth";
export default {
    name: "Navbar-comp",
    props: {
        privateRoute: {
            type: Boolean,
            require: true,
        },
        email: [],
    },
    data() {
        return {
            drawer: null,
            items: [               
                { title: "Lista de Cursos", icon: "mdi-forum", link: "/sing-in" },
                { title: "Administracion", icon: "mdi-forum", link: "/admin" },
            ],
        };
    },
    methods: {
        ...mapActions(["remove_datauser"]),
        logout() {
            const auth = getAuth();
            this.remove_datauser();
            signOut(auth)
                .then(() => {
                    this.$router.push("/login");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
<style></style>
