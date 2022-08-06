<template>
    <v-main>
        <v-container>
            <v-row>
                <CardCourses></CardCourses>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapActions } from "vuex";
import CardCourses from "@/components/Cards.vue";
export default {
    name: "Home-view",
    data() {
        return {};
    },
    methods: {
        ...mapActions(["getCourses"]),
    },
    components: {
        CardCourses,
    },
    created() {
        this.getCourses();
    },
};
</script>

<style>
body {
    font-family: "Source Code Pro", monospace;
}
</style>
