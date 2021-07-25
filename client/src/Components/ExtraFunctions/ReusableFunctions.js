export const convertAmericanDate = (string) => {
  return string.split('-').reverse().join('/')
}