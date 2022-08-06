<template>
    <v-container>
        <template>
            <div class="text-center">
                <v-dialog
                    v-model="dialog"
                    persistent
                    width="800">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on">
                            AGREGAR CURSO
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2"> Privacy Policy </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row
                                    class="pt-2"
                                    justify="center">
                                    <v-col
                                        md="5"
                                        class="col-12 col-md-12 col-sm-12">
                                        <h2>Agregando Curso</h2>
                                        <v-form
                                            class="pt-5"
                                            ref="form"
                                            v-model="valid"
                                            lazy-validation>
                                            <v-text-field
                                                v-model="newCourse.name"
                                                label="Nombre curso"
                                                :rules="dataRules"
                                                required>
                                            </v-text-field>
                                            <v-text-field
                                                v-model="newCourse.image"
                                                label="URL de la imagen del curso"
                                                :rules="dataRules"
                                                required>
                                            </v-text-field>
                                            <v-text-field
                                                v-model="newCourse.quantity"
                                                :rules="numbersRules"
                                                label="Cupos del curso"
                                                required>
                                            </v-text-field>
                                            <v-text-field
                                                v-model="newCourse.enrolled"
                                                :rules="enrolledRules"
                                                label="Inscritos en el curso"
                                                required>
                                            </v-text-field>
                                            <v-text-field
                                                v-model="newCourse.duration"
                                                label="Duración del curso"
                                                :rules="dataRules"
                                                required>
                                            </v-text-field>
                                            <v-text-field
                                                v-model="newCourse.price"
                                                :rules="numbersRules"
                                                label="Costo del curso"
                                                required>
                                            </v-text-field>
                                            <v-text-field
                                                v-model="newCourse.code"
                                                label="Código del curso"
                                                :rules="dataRules"
                                                required>
                                            </v-text-field>
                                            <v-textarea
                                                v-model="newCourse.description"
                                                outlined
                                                name="input-7-4"
                                                label="Descripción del curso">
                                            </v-textarea>
                                        </v-form>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                @click="addCourse"
                                color="success"
                                class="mr-4"
                                >Agregar
                            </v-btn>
                            <v-btn
                                color="warning"
                                class="mr-4"
                                @click="resetForm">
                                Limpiar Formulario
                            </v-btn>
                            <v-btn
                                color="error"
                                class="mr-4"
                                @click="closeDialog">
                                Cerrar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </template>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { db } from "@/firebase/firebase.js";
import { collection, addDoc } from "firebase/firestore";
export default {
    name: "FormModal-comp",
    data() {
        return {
            valid: false,
            dialog: false,
            newCourse: {
                name: "",
                image: "",
                quantity: "",
                enrolled: "",
                duration: "",
                price: "",
                code: "",
                description: "",
                registry: "",
                active: false,
            },
            enrolledRules: [
                (v) => !!v || "La cantidad es requerida",
                (v) => {
                    const value = v;
                    const valueQuantity = this.newCourse.quantity;
                    const toNumberEnrolled = Number(value);
                    const toNumberQuantity = Number(valueQuantity);
                    if (toNumberEnrolled > toNumberQuantity) {
                        setTimeout(() => {
                            this.newCourse.enrolled = "0";
                        }, 1500);
                        return "Sobrepasa los cupos";
                    } else {
                        return true;
                    }
                },
            ],
            dataRules: [(v) => !!v || "Los datos son requeridos"],
            numbersRules: [(v) => !!v || "La cantidad es requerida", (v) => /^[0-9]*$/.test(v) || "Solo números"],
        };
    },
    methods: {
        ...mapActions(["getCourses"]),
        async addCourse() {
            if (!this.$refs.form.validate()) return;
            this.dateTime();
            try {
                const response = await addDoc(collection(db, "Cursos"), this.newCourse);
                this.getCourses();
                this.resetForm();
                this.dialog = false;
            } catch (error) {
                console.log(error);
            }
        },
        resetForm() {
            this.$refs.form.reset();
        },
        dateTime() {
            const date = new Date();
            const dataTime = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("-");
            return (this.newCourse.registry = dataTime);
        },
        closeDialog() {
            this.resetForm();
            this.dialog = false;
        },
    },
};
</script>

<style scoped></style>
