import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    freeMemory: null,
    usedMemory: null,
    platform: null,
    cpuUsed: null,
    alertFrequency: 300000
  },
  mutations: {
    setFreeMemory(state,payload) {
      state.freeMemory = payload
    },
    setUsedMemory(state,payload) {
      state.freeMemory = payload
    },
    setPlatform(state, payload) {
      state.platform = payload
    },
    setCpuUsed(state, payload) {
      state.cpuUsed = payload
    },
    setAlertFrequency(state, payload) {
      state.alertFrequency = payload
    }
  },

  actions: {
    setFreeMemory({commit}, payload) {
      commit('setFreeMemory', payload)
    },
    setUsedMemory({commit}, payload) {
      commit('setUsedMemory', payload)
    },
    setPlatform({commit}, payload) {
      commit('setPlatform', payload)
    },
    setCpuUsed({commit}, payload) {
      commit('setCpuUsed', payload)
    },
    setAlertFrequency({commit}, payload) {
      commit('setAlertFrequency', payload)
    }
  },

  getters: {
    freeMemory(state) {
      return state.freeMemory
    },
    usedMemory(state) {
      return state.usedMemory
    },
    cpuUsed(state) {
      return state.cpuUsed
    },
    alertFrequency(state) {
      return state.alertFrequency
    },
    platform(state) {
      return state.platform
    }
  }

})
