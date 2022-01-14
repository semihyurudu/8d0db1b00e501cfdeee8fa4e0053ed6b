export const helper = {
  methods: {
    parseDate: (date) => {
      return new Date(date);
    },
    dateDiff: (start, end) => {
      if(!start || !end) {
        return 1
      }
      return Math.round((helper.methods.parseDate(end) - helper.methods.parseDate(start))/(1000*60*60*24));
    },
    priceFormat: (price) => {
      return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price)
    },
    getCurrentDate: () => {
      return new Date().toISOString().slice(0, 10)
    }
  }
}
