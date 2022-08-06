<template>
    <v-main>
        <v-container>
            <v-row
                class="mx-auto text-center"
                justify="center"
            >
                <v-col class="mx-auto">
                    <h1>Editar Curso</h1>
                    <CourseForm :idCourse="id"></CourseForm>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import CourseForm from "@/components/CourseForm.vue";
export default {
    name: "EditCourse-view",
    props: ["id"],
    data() {
        return {};
    },
    components: {
        CourseForm,
    },
};
</script>

<style scoped></style>
