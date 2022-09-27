class MoneyFunc {
  getMoneyFormat(number: number, decPlaces = 2, decSep = ',', thouSep = ' ', unitName = '', unitMode = ''): string {
    let money = number
      .toFixed(decPlaces)
      .replace(/\d(?=(\d{3})+\.)/g, '$&' + thouSep)
      .replace('.', decSep)
    if (unitName) {
      if (unitMode === 'before') money = unitName + money
      if (unitMode === 'after') money = money + unitName
    }
    return money
  }
}
export default new MoneyFunc()
