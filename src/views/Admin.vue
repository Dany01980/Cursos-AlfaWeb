<template>
    <v-main>
        <v-container>
            <v-row
                class="mx-auto text-center"
                justify="center">
                <v-col
                    class="mx-auto"
                    justify="center">
                    <h1>Administración</h1>
                    <FormModal></FormModal>
                    <Table></Table>
                    <AlertBars></AlertBars>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AlertBars from "@/components/AlertBars.vue";
import FormModal from "@/components/FormModal.vue";
import Table from "@/components/Table.vue";
export default {
    name: "Admin-view",
    data() {
        return {};
    },
    components: {
        FormModal,
        Table,
        AlertBars,
    },
    computed: {
        ...mapGetters(["alumnosPermitidos", "alumnosInscritos", "cuposRestantes", "cursosTerminados", "cursosActivos", "totalCursos"]),
    },
    methods: {
        ...mapActions(["getCourses"]),
    },
    created() {
        this.getCourses();
    },
};
</script>

<style scoped></style>
