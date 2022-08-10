//该文件用于创建vuex最为核心的store
import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex)
const actions = {}
const mutations = {}
const state = {}

const store = new Vuex.Store({
    actions,
    mutations,
    state,
})

//暴露store
export default store