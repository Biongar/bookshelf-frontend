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
    const year: string = objDate.getFullYear().toString()
    let month: string = (objDate.getMonth() + 1).toString()
    if (month.length == 1) month = '0' + month
    let day: string = objDate.getDate().toString()
    if (day.length == 1) day = '0' + day
    let hour: string = objDate.getHours().toString()
    if (hour.length == 1) hour = '0' + hour
    let minute: string = objDate.getMinutes().toString()
    if (minute.length == 1) minute = '0' + minute
    let second: string = objDate.getSeconds().toString()
    if (second.length == 1) second = '0' + second
    const dateResult = `${day}.${month}.${year} ${hour}:${minute}:${second}`
    return dateResult
  }
}

export default new DateFunc()
