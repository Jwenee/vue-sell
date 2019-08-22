export function formatDate(tmp) {
  const date = new Date(tmp)
  const year = date.getFullYear()
  const month = leftZero(date.getMonth() + 1)
  const days = leftZero(date.getDate())
  const hours = leftZero(date.getHours())
  const seconds = leftZero(date.getSeconds())
  return `${year}-${month}-${days} ${hours}:${seconds}`
}

function leftZero(num) {
  return num < 10 ? `0${num}` : num
}