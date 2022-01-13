import Vue from "vue"

export const state = () => ({
  step: 1
})

export const getters = {
  step: state => state.step
}

export const mutations = {
  SET_STEP(state, data) {
    Vue.set(state, "step", data)
  }
}

export const actions = {
  async setStep({ commit }, data) {
    await commit("SET_STEP", data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
};