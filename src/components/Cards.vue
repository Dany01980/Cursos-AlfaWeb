<template>
    <v-container>
        <h1 class="d-block text-center py-10">Lista de Cursos</h1>
        <v-row>
            <v-col
                class="d-flex justify-center"
                v-for="(course, i) in courses"
                :key="i">
                <v-card
                    width="350"
                    color="#f5f5f5">
                    <v-img
                        height="200px"
                        :src="course.image">
                    </v-img>

                    <v-card-text>
                        <v-card-title primary-title>{{ course.name }}</v-card-title>
                        <div class="font-weight-bold ml-8 mb-2">Información</div>

                        <v-timeline
                            align-top
                            dense>
                            <v-timeline-item
                                small
                                color="deep-purple lighten-1">
                                <div>
                                    <div>
                                        Costo: <strong>{{ course.price }}</strong>
                                    </div>
                                    <div>
                                        Durción: <strong>{{ course.duration }}</strong>
                                    </div>
                                </div>
                            </v-timeline-item>
                            <v-timeline-item
                                small
                                color="green">
                                <div>
                                    <div>
                                        Cupos:
                                        <strong>{{ course.quantity }}</strong>
                                    </div>
                                    <div>
                                        Completado:
                                        <strong>{{ course.active | courseComplete(course.active) }}</strong>
                                    </div>
                                </div>
                            </v-timeline-item>
                            <v-timeline-item
                                small
                                color="deep-purple lighten-1">
                                <div>
                                    <div>Fecha de Registro:</div>
                                    <div>{{ course.registry }}</div>
                                </div>
                            </v-timeline-item>
                            <v-timeline-item
                                small
                                color="green">
                                <div>
                                    <div>Descripción:</div>
                                    <div>{{ course.description }}.</div>
                                </div>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "Card-comp",
    data() {
        return {};
    },
    computed: {
        ...mapState(["courses"]),
    },
    filters: {
        courseComplete(filter) {
            if (filter === false) {
                return "No";
            } else {
                return "Si";
            }
        },
    },
};
</script>

<style>
div {
    font-family: "Source Code Pro", monospace;
}
</style>
