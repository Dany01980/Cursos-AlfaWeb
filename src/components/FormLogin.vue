<template>
    <v-container>
        <v-alert
            v-if="alert"
            class="alert-login"
            type="error"
            elevation="3"
            dismissible
            @click="alertFalse">
            Usuario o contraseña incorrectos
        </v-alert>
        <v-row
            class="pt-16"
            justify="center">
            <v-col
                class="col-12 col-md-12 col-sm-12"
                md="5">
                <h2>Login</h2>
                <v-form
                    class="pt-5"
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

                    <v-btn
                        @click="loginUser"
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

                    <a href="/sing-in"><span>¿No tienes cuenta?</span></a>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
    name: "FormLogin-comp",
    data() {
        return {
            alert: false,
            valid: true,
            pass: "",
            email: "",
            passRules: [(v) => !!v || "Contraseña es requerida", (v) => (v && v.length <= 6) || "Contraseña debe tener al menos 6 caracteres"],
            emailRules: [(v) => !!v || "E-mail es requerido", (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || "E-mail debe ser válido"],
        };
    },
    methods: {
        ...mapActions(["add_datauser"]),
        loginUser() {
            this.$refs.form.validate();
            if (this.valid == false) return;

            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.pass)
                .then((userCredencial) => {
                    const user = userCredencial.user;
                    // console.log(user);
                    // console.log(user.email);
                    this.add_datauser(user.email);
                    this.alert = false;
                    this.$router.push("/");
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
