import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase/firebase.js' // Inicializar la APP 
import { collection, getDocs } from 'firebase/firestore'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        courses: [],
        email: []
    },
    getters: {
        alumnosPermitidos(state) {
            return state.courses.reduce((a, b) => {
                const primerValor = a;
                const segundoValor = b.quantity
                return Number(primerValor) + Number(segundoValor)
            }, 0)
        },
        alumnosInscritos(state) {
            return state.courses.reduce((a, b) => {
                const primerValor = a;
                const segundoValor = b.enrolled
                return Number(primerValor) + Number(segundoValor)
            }, 0)
        },
        cuposRestantes(state, getters) {
            return getters.alumnosPermitidos - getters.alumnosInscritos
        },
        cursosTerminados(state) {
            let counts = 0;
            state.courses.forEach((active) => {
                if (active.active === true) {
                    counts += 1;
                }
            })
            return counts;
        },
        cursosActivos(state) {
            let counts = 0;
            state.courses.forEach((active) => {
                if (active.active === false) {
                    counts += 1;
                }
            })
            return counts
        },
        totalCursos(state) {
            const length = state.courses.length
            return length;
        }

    },
    mutations: {
        //COURSES IN STATE FROM DATABSE
        ADD_COURSES(state, courses) {
            state.courses.push({
                id: courses.id,
                active: courses.data().active,
                code: courses.data().code,
                description: courses.data().description,
                duration: courses.data().duration,
                enrolled: courses.data().enrolled,
                image: courses.data().image,
                name: courses.data().name,
                price: courses.data().price,
                quantity: courses.data().quantity,
                registry: courses.data().registry,
            })
        },
        RESET_COURSES(state) {
            state.courses = [];
        },

        REMOVE_COURSE_STATE(state, idCourse) {
            let index = state.courses.findIndex((c) => {
                c.id == idCourse
            })
            state.courses.splice(index, 1)
        },

        //USERS IN STATE
        ADD_DATAUSER(state, email) {
            state.email.push(email)
        },
        RESET_DATAUSER(state) {
            state.email = [];
        },
    },
    actions: {
        //COURSES ACTIONS
        async getCourses({ commit }) {
            const querySnapShot = await getDocs(collection(db, 'Cursos'))
            commit('RESET_COURSES')
            
            querySnapShot.forEach((courses) => {
                commit('ADD_COURSES', courses)
            })
        },

        remove_course_state({ commit }, idCourses) {
            commit('REMOVE_COURSE_STATE', idCourses)
        },

        //USERS ACTIONS
        add_datauser: ({ commit }, email) => {
            commit('ADD_DATAUSER', email)
        },
        remove_datauser: ({ commit }) => {
            commit('RESET_DATAUSER')
        }

    },
    modules: {
    }
})
