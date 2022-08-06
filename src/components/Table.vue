<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="courses"
            class="elevation-1 my-8">
            <template v-slot:[`item.price`]="{ item }">
                <v-chip
                    color="green"
                    dark>
                    {{ item.price }}
                </v-chip>
            </template>
            <template v-slot:[`item.active`]="{ item }">
                <v-chip :color="getColor(item.active)">
                    {{ item.active == true ? "Si" : "No" }}
                </v-chip>
            </template>
            <template v-slot:[`item.registry`]="{ item }">
                <v-chip
                    color="green"
                    dark>
                    {{ item.registry }}
                </v-chip>
            </template>
            <template v-slot:[`item.Acciones`]="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editCourse(item.id)">
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    class="mr-2"
                    @click="deleteID(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        <v-dialog
            v-model="dialog"
            max-width="500px">
            <v-card v-model="elimination">
                <v-card-title class="titulo-card text-h5">¿Está seguro de borrar este curso?</v-card-title>
                <v-divider></v-divider>
                <p class="text-center pt-5 titulo-curso">
                    <strong>Nombre del curso: {{ elimination.name }}</strong>
                </p>
                <div class="text-center px-4 pb-4">Curso creado: {{ elimination.registry }}</div>
                <div class="text-center px-4 pb-4">No se podrán recuperar los datos al eliminar</div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                        >Cancel
                    </v-btn>
                    <v-btn
                        color="red"
                        text
                        @click="deleteComplete(elimination.id)"
                        >OK
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout">
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="red accent-2"
                    text
                    v-bind="attrs"
                    @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import { db } from "@/firebase/firebase.js";
import { doc, deleteDoc } from "@firebase/firestore";
import { mapActions, mapState } from "vuex";
export default {
    name: "Table-comp",
    data() {
        return {
            snackbar: false,
            text: "Curso eliminado con éxito",
            timeout: 3000,
            dialog: false,
            elimination: {
                idCourse: "",
                name: "",
                image: "",
                quantity: "",
                enrolled: "",
                duration: "",
                price: "",
                code: "",
                description: "",
                registry: "",
                active: "",
            },
            headers: [
                {
                    text: "Cursos",
                    align: "start",
                    sortable: false,
                    value: "name",
                },
                { text: "Cupos", value: "quantity" },
                { text: "Inscritos", value: "enrolled" },
                { text: "Duración", value: "duration", sortable: false },
                { text: "Costos", value: "price" },
                { text: "Terminado", value: "active" },
                { text: "Fecha", value: "registry" },
                { text: "Acciones", value: "Acciones" },
            ],
        };
    },
    computed: {
        ...mapState(["courses"]),
    },
    methods: {
        ...mapActions(["remove_course_state"]),
        editCourse(id) {
            const redirect = this.$router.push(`admin/${id}`);
        },
        deleteID(item) {            
            this.dialog = true;
            this.elimination = item;
        },
        async deleteComplete(id) {
            try {
                const deleteItem = await deleteDoc(doc(db, "Cursos", id));
                this.dialog = false;
                this.remove_course_state(id);
                this.snackbar = true;
            } catch (error) {
                console.log(error);
            }
        },
        getColor(item) {
            if (item) {
                return "info";
            } else {
                return "light-grey";
            }
        },
    },
};
</script>

<style scoped>
.titulo-card {
    text-align: center !important;
    font-family: "Source Code Pro", monospace;
    font-size: 22px;
    font-weight: 700;
}
.titulo-curso {
    text-align: center !important;
    font-family: "Source Code Pro", monospace;
    font-size: 20px;
    font-weight: 700;
}
</style>
