import Vue from "vue"

export const state = () => ({
  step: 1,
  hotel_list: [],
  selected_hotel: {},
  hotel_details: [],
  selected_room: "",
  selected_scenic: "",
  coupon_code: "",
  discount_amount: 0,
})

export const getters = {
  step: state => state.step,
  hotel_list: state => state.hotel_list,
  selected_hotel: state => state.selected_hotel,
  hotel_details: state => state.hotel_details,
  selected_room: state => state.selected_room,
  selected_scenic: state => state.selected_scenic,
  coupon_code: state => state.coupon_code,
  discount_amount: state => state.discount_amount,
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
  },
  SET_HOTEL_DETAILS(state, data) {
    Vue.set(state, "hotel_details", data)
  },
  SET_SELECTED_ROOM(state, data) {
    Vue.set(state, "selected_room", data)
  },
  SET_SELECTED_SCENIC(state, data) {
    Vue.set(state, "selected_scenic", data)
  },
  SET_COUPON_CODE(state, data) {
    Vue.set(state, "coupon_code", data)
  },
  SET_DISCOUNT_AMOUNT(state, data) {
    Vue.set(state, "discount_amount", data)
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
    await commit("SET_SELECTED_HOTEL", data)
  },
  async setHotelDetails({ commit }, data) {
    await commit("SET_HOTEL_DETAILS", data)
  },
  async setSelectedRoom({ commit }, data) {
    await commit("SET_SELECTED_ROOM", data)
  },
  async setSelectedScenic({ commit }, data) {
    await commit("SET_SELECTED_SCENIC", data)
  },
  async resetFields({ commit }) {
    await commit("SET_STEP", 1)
    await commit("SET_HOTEL_LIST", [])
    await commit("SET_SELECTED_HOTEL", {})
    await commit("SET_HOTEL_DETAILS", [])
    await commit("SET_SELECTED_ROOM", "")
    await commit("SET_SELECTED_SCENIC", "")
  },
  async setCouponCode({ commit }, data) {
    await commit("SET_COUPON_CODE", data)
  },
  async setDiscountAmount({ commit }, data) {
    await commit("SET_DISCOUNT_AMOUNT", data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
};