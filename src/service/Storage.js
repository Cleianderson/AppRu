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
export async function setItem(str, json) {
  await Storage.setItem(
    str,
    JSON.stringify(json)
  )
}

export async function getItem(str) {
  return await Storage.getItem(str)
}

// Atualiza as variáveis food e @week
export async function updateWeekStorage(foods, week = null) {
  if (week !== null) {
    await setWeek('@week', week.number_week, foods)
  }
}
