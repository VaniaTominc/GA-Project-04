export const convertAmericanDate = (string) => {
  return string.split('-').reverse().join('/')
}

export const star = (item) => {
  return '⭐️'.repeat(item)
}