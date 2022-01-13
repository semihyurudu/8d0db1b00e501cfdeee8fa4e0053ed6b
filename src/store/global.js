import Vue from "vue"

export const state = () => ({
  step: 1,
  hotel_list: [],
  selected_hotel: {}
})

export const getters = {
  step: state => state.step,
  hotel_list: state => state.hotel_list,
  selected_hotel: state => state.selected_hotel
}

export const mutations = {
  SET_STEP(state, data) {
    Vue.set(state, "step", data)
  },
  SET_HOTEL_LIST(state, data) {
    Vue.set(state, "hotel_list", data)
  },
  SET_SELECTED_HOTEL(state, data) {
    Vue.set(state, "selected_hotel", data)
  }
}

export const actions = {
  async setStep({ commit }, data) {
    await commit("SET_STEP", data)
  },
  async setHotelList({ commit }, data) {
    await commit("SET_HOTEL_LIST", data)
  },
  async setSelectedHotel({ commit }, data) {
    await console.log('data', data)
    await commit("SET_SELECTED_HOTEL", data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
};