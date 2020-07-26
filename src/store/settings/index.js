// import state from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as actions from './actions'
import { LocalStorage } from 'quasar'

export default {
  namespaced: true,

  state: {
    freeMemory: null,
    usedMemory: null,
    platform: {},
    cpuUsed: null,
    alertFrequency: 10000,
    upTime: null,
    cpu: {},
    settings: {
      warning: 60,
      alert: 5
    }

  },
  mutations: {
    setFreeMemory(state, payload) {
      state.freeMemory = payload
    },
    setUsedMemory(state, payload) {
      state.freeMemory = payload
    },
    setPlatform(state, payload) {
      state.platform = Object.assign({}, payload)
    },
    setCPUUsed(state, payload) {
      state.cpuUsed = Math.round(payload)
    },
    setAlertFrequency(state, payload) {
      state.alertFrequency = payload
    },
    setUpTime(state, payload) {
      state.upTime = payload
    },
    setCPU(state, payload) {
      state.cpu = Object.assign({}, payload)
    },
    saveWarning(state, payload) {
      state.settings.warning = payload
    },
    saveAlert(state, payload) {
      state.settings.alert = payload
    }
  },

  actions: {
    setFreeMemory({ commit }, payload) {
      commit('setFreeMemory', payload)
    },
    setUsedMemory({ commit }, payload) {
      commit('setUsedMemory', payload.used)
    },
    setPlatform({ commit }, payload) {
      commit('setPlatform', payload)
    },
    setCPUUsed({ commit }, payload) {
      commit('setCPUUsed', payload)
    },
    setAlertFrequency({ commit }, payload) {
      commit('setAlertFrequency', payload)
    },
    setUpTime({ commit }, payload) {
      commit('setUpTime', payload)
    },
    setCPU({ commit }, payload) {
      commit('setCPU', payload)
    },
    saveWarning({ commit }, payload) {
      commit('saveWarning', payload)
      LocalStorage.set('systop:warning', payload)
    },
    loadWarning({ commit }) {
      let warning = LocalStorage.getItem('systop:warning')

      if ( warning ) {
        warning = parseInt(warning)
        commit('saveWarning', warning)
      }
    },
    saveAlert({ commit }, payload) {
      commit('saveAlert', payload)
      LocalStorage.set('systop:alert', payload)
    },
    loadAlert({ commit }) {
      const alert = LocalStorage.getItem('systop:alert')
      if ( alert ) {
        commit('saveAlert', alert)
      }
    }
  },

  getters: {
    getFreeMemory(state) {
      return state.freeMemory
    },
    getUsedMemory(state) {
      return state.usedMemory
    },
    getCPUUsage(state) {
      return state.cpuUsed
    },
    getAlertFrequency(state) {
      return state.alertFrequency
    },
    getPlatform(state) {
      return state.platform
    },
    getUpTime(state) {
      return state.upTime
    },
    getCPU(state) {
      return state.cpu
    },
    getSettings(state) {
      return state.settings
    }
  }

}
