interface GetToken {
  (): {
    access: string
    refresh: string
  }
}

export const getToken: GetToken = () => {
  try {
    return JSON.parse(localStorage.getItem(`token`) || `{}`)
  } catch (err) {
    console.error(err)
    return {}
  }
}
