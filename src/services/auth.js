import { reactive } from 'vue'

// export const authState = reactive({
//   token: localStorage.getItem('authToken') || null,
//   role: localStorage.getItem('userRole') || null,
//   userId: localStorage.getItem('userId') || null
// })

// export function setAuth(token, role, userId) {
//   authState.token = token
//   authState.role = role
//   authState.userId = userId
//   localStorage.setItem('authToken', token)
//   localStorage.setItem('userRole', role)
//   localStorage.setItem('userId', userId)
// }

// export function clearAuth() {
//   authState.token = null
//   authState.role = null
//   authState.userId = null
//   localStorage.removeItem('authToken')
//   localStorage.removeItem('userRole')
//   localStorage.removeItem('userId')
// }

export const authState = reactive({
  role: localStorage.getItem('userRole') || null,
  userId: localStorage.getItem('userId') || null
})

export function setAuth(role, userId) {
  authState.role = role
  authState.userId = userId
  localStorage.setItem('userRole', role)
  localStorage.setItem('userId', userId)
}

export function clearAuth() {
  authState.role = null
  authState.userId = null
  localStorage.removeItem('userRole')
  localStorage.removeItem('userId')
}
