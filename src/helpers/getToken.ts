interface GetToken {
  (): {
    access: string
    refresh: string
  }
}

const getToken: GetToken = () => {
  try {
    return JSON.parse(localStorage.getItem(`token`) as string)
  } catch (err) {
    console.error(err)
    return
  }
}

export default getToken
