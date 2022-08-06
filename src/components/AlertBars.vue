<template>
    <div>
        <v-alert
            class="text-start"
            color="purple"
            icon="mdi-account-group"
            dense
            outlined>
            Cantidad total de alumnos permitidos: {{ alumnosPermitidos }}
        </v-alert>
        <v-alert
            class="text-start"
            color="info"
            icon="mdi-account-multiple-check"
            dense
            outlined>
            Cantidad total de alumnos inscritos: {{ alumnosInscritos }}
        </v-alert>
        <v-alert
            class="text-start"
            color="red"
            icon="mdi-account-clock"
            dense
            outlined>
            Cantidad total de cupos restantes: {{ cuposRestantes }}
        </v-alert>
        <v-alert
            class="text-start"
            color="pink"
            icon="mdi-block-helper"
            dense
            outlined>
            Cantidad total de cursos terminados: {{ cursosTerminados }}
        </v-alert>
        <v-alert
            class="text-start"
            color="brown"
            icon="mdi-bell-ring"
            dense
            outlined>
            Cantidad total de cursos activos: {{ cursosActivos }}
        </v-alert>
        <v-alert
            class="text-start"
            color="warning"
            icon="mdi-bell-ring"
            dense
            outlined>
            Cantidad total de cursos: {{ totalCursos }}
        </v-alert>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Alert-comp",
    props: {
        info: {
            type: Array,
            require: true,
        },
    },

    data() {
        return {};
    },
    computed: {
        ...mapGetters(["alumnosPermitidos", "alumnosInscritos", "cuposRestantes", "cursosTerminados", "cursosActivos", "totalCursos"]),
    },
};
</script>

<style scoped></style>
