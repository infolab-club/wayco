export const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY

export const BASE_URL = `https://wayco-back.herokuapp.com`

export enum ReduxStatus {
  idle,
  loading,
  success,
  error,
}
