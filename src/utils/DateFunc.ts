class DateFunc {
  getDateNow(): string {
    const nowDate = new Date()
    const year: string = nowDate.getUTCFullYear().toString()
    let month: string = (nowDate.getUTCMonth() + 1).toString()
    if (month.length == 1) month = '0' + month
    let day: string = nowDate.getUTCDate().toString()
    if (day.length == 1) day = '0' + day
    const date: string = year + '-' + month + '-' + day
    return date
  }
  getDateRus(date?: string): string {
    const objDate = date !== undefined ? new Date(date) : new Date()
    const year: string = objDate.getUTCFullYear().toString()
    let month: string = (objDate.getUTCMonth() + 1).toString()
    if (month.length == 1) month = '0' + month
    let day: string = objDate.getUTCDate().toString()
    if (day.length == 1) day = '0' + day
    //const dateResult: string = year + '-' + month + '-' + day
    const dateResult: string = day + '.' + month + '.' + year
    return dateResult
  }
}

export default new DateFunc()
