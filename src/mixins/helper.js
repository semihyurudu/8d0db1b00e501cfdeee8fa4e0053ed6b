export const helper = {
  methods: {
    random: function (start = 0, end = 100) {
      return Math.floor(Math.random() * end) + start
    }
  }
}
