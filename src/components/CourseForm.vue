<template>
    <v-container>
        <v-row
            class="pt-16"
            justify="center">
            <v-col md="6">
                <h2>Editar Curso</h2>
                <v-form
                    class="pt-5"
                    ref="form"
                    v-model="valid"
                    lazy-validation>
                    <v-text-field
                        v-model="editCourse.name"
                        label="Nombre curso"
                        :rules="dataRules"
                        required>
                    </v-text-field>
                    <v-text-field
                        v-model="editCourse.image"
                        label="URL de la imagen del curso"
                        :rules="dataRules"
                        required>
                    </v-text-field>
                    <v-text-field
                        v-model="editCourse.quantity"
                        :rules="numbersRules"
                        label="Cupos del curso"
                        required>
                    </v-text-field>
                    <v-text-field
                        v-model="editCourse.enrolled"
                        :rules="enrolledRules"
                        label="Inscritos en el curso"
                        required>
                    </v-text-field>
                    <v-text-field
                        v-model="editCourse.duration"
                        label="Duración del curso"
                        :rules="dataRules"
                        required>
                    </v-text-field>
                    <v-text-field
                        v-model="editCourse.price"
                        :rules="numbersRules"
                        label="Costo del curso"
                        required>
                    </v-text-field>
                    <v-text-field
                        v-model="editCourse.code"
                        label="Código del curso"
                        :rules="dataRules"
                        required>
                    </v-text-field>
                    <v-textarea
                        v-model="editCourse.description"
                        outlined
                        :rules="dataRules"
                        required
                        name="input-7-4"
                        label="Descripción del curso">
                    </v-textarea>
                    <v-text-field
                        v-model="editCourse.registry"
                        label="Fecha de registro"
                        :rules="dataRules"
                        required>
                    </v-text-field>
                    <v-switch
                        v-model="editCourse.active"
                        :label="editCourse.active | courseComplete(editCourse.active)">
                    </v-switch>
                </v-form>

                <v-col class="d-flex justify-center">
                    <v-btn
                        @click="updateCourse"
                        color="success"
                        class="mr-4"
                        >Actualizar
                    </v-btn>
                    <v-btn
                        color="error"
                        class="mr-4"
                        @click="resetForm">
                        Limpiar Formulario
                    </v-btn>
                    <v-btn
                        color="info"
                        class="mr-4"
                        @click="$router.push('/admin')">
                        Regresar
                    </v-btn>
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { db } from "@/firebase/firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
export default {
    name: "Course-Form-comp",
    props: {
        idCourse: {
            type: String,
            require: true,
        },
    },
    data() {
        return {
            valid: false,
            editCourse: {
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
            enrolledRules: [
                (v) => !!v || "La cantidad es requerida",
                (v) => {
                    const value = v;
                    const valueQuantity = this.editCourse.quantity;
                    const toNumberEnrolled = Number(value);
                    const toNumberQuantity = Number(valueQuantity);
                    if (toNumberEnrolled > toNumberQuantity) {
                        setTimeout(() => {
                            this.editCourse.enrolled = "0";
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
        async getCourseID() {
            const docRef = doc(db, "Cursos", this.idCourse);
            const response = await getDoc(docRef);
            this.editCourse = response.data();
        },

        async updateCourse() {
            this.$refs.form.validate();
            if (!this.$refs.form.validate()) return;
            try {
                const newDataCourse = this.editCourse;
                const update = await updateDoc(doc(db, "Cursos", this.idCourse), newDataCourse);
                this.$router.push("/admin");
            } catch (error) {
                console.log(error);
            }
        },

        resetForm() {
            this.$refs.form.reset();
        },
    },
    filters: {
        courseComplete(filter) {
            if (filter === false) {
                return "Terminado: No";
            } else {
                return "Terminado: Si";
            }
        },
    },
    created() {
        this.getCourseID();
    },
};
</script>

<style scoped></style>
