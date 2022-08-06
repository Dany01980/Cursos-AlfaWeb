<template>
    <v-main>
        <FormLogin></FormLogin>
    </v-main>
</template>

<script>
import FormLogin from "@/components/FormLogin.vue";
export default {
    name: "Login-view",
    data() {
        return {};
    },
    components: {
        FormLogin,
    },
};
</script>

<style scoped></style>
