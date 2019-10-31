export const startLoginCheck = () => ({
  type: 'START_LOGIN_CHECK'
})

export const login = () => ({
  type: 'LOGIN'
})

export const loginApiError = error => ({
  type: 'LOGIN_API_ERROR',
  error
})