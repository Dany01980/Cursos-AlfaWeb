<template>
    <v-container>
        <v-alert
            v-if="alert"
            class="alert-login"
            type="error"
            elevation="3"
            dismissible
            @click="alertFalse">
            Debe completar los campos
        </v-alert>
        <v-row justify="center">
            <v-col md="5">
                <h2>Sing - in</h2>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation>
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Correo"
                        required></v-text-field>

                    <v-text-field
                        v-model="pass"
                        :rules="passRules"
                        label="Contraseña"
                        required
                        type="password"></v-text-field>

                    <v-text-field
                        v-model="repeatpass"
                        :rules="passRules"
                        label="Contraseña"
                        required
                        type="password"></v-text-field>

                    <v-btn
                        @click="createUser"
                        :disabled="!valid"
                        color="success"
                        class="mr-4">
                        Ingresar
                    </v-btn>

                    <v-btn
                        color="error"
                        class="mr-4"
                        @click="resetForm">
                        Limpiar Formulario
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
    name: "FormNewUser-comp",
    data() {
        return {
            alert: false,
            valid: true,
            pass: "",
            repeatpass: "",
            email: "",
            passRules: [(v) => !!v || "Contraseña es requerido", (v) => (v && v.length <= 6) || "Contraseña deb tener al menos 6 caracteres"],
            emailRules: [(v) => !!v || "E-mail es requerido", (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || "E-mail debe ser válido"],
        };
    },
    methods: {
        createUser() {
            this.$refs.form.validate();
            if (this.valid == false || this.pass !== this.repeatpass) return console.log("Pass no es igual");

            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.pass)
                .then((userCredencial) => {
                    const user = userCredencial.user;
                    // console.log(user);
                    this.alert = false;
                    this.$router.push("/login");
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    this.alert = true;
                });
        },
        resetForm() {
            this.$refs.form.reset();
        },
        alertFalse() {
            this.alert = false;
        },
    },
};
</script>

<style>
.alert-login {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}
</style>
