import Storage from '@react-native-community/async-storage'

export async function setWeek(str, number_week, foods) {
  await Storage.setItem(
    str,
    JSON.stringify({
      number_week,
      foods,
    })
  )
}

export async function getWeek(str) {
  return await Storage.getItem(str)
}
