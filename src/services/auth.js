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
  userId: localStorage.getItem('userId') || null,
  restaurantId: localStorage.getItem('restaurantId') || null, 
  firstName: localStorage.getItem('firstName') || null, 
  lastName: localStorage.getItem('lastName') || null, 
  email: localStorage.getItem('email') || null, 
  password: localStorage.getItem('password') || null, 
  contactNo: localStorage.getItem('contactNo') || null, 
  creditCardNo: localStorage.getItem('creditCardNo') || null, 
  creditCardName: localStorage.getItem('creditCardName') || null, 
  creditCardExpiryDate: localStorage.getItem('creditCardExpiryDate') || null, 
  creditCardSecurityCode: localStorage.getItem('creditCardSecurityCode') || null, 
  homeAddress: localStorage.getItem('homeAddress') || null,
  restaurantName: localStorage.getItem('restaurantName') || null
})

export function setAuth(role, userId, restaurantId, firstName, lastName, email, password, contactNo, creditCardNo, creditCardName, creditCardExpiryDate, creditCardSecurityCode, homeAddress, restaurantName) {
  authState.role = role
  authState.userId = userId
  authState.restaurantId = restaurantId
  authState.firstName = firstName
  authState.lastName = lastName
  authState.email = email
  authState.password = password
  authState.contactNo = contactNo
  authState.creditCardNo = creditCardNo
  authState.creditCardName = creditCardName
  authState.creditCardExpiryDate = creditCardExpiryDate
  authState.creditCardSecurityCode = creditCardSecurityCode
  authState.homeAddress = homeAddress
  authState.restaurantName = restaurantName

  localStorage.setItem('userRole', role)
  localStorage.setItem('userId', userId)
  localStorage.setItem('restaurantId', restaurantId)
  localStorage.setItem('firstName', firstName)
  localStorage.setItem('lastName', lastName)
  localStorage.setItem('email', email)
  localStorage.setItem('password', password)
  localStorage.setItem('contactNo', contactNo)
  localStorage.setItem('creditCardNo', creditCardNo)
  localStorage.setItem('creditCardName', creditCardName)
  localStorage.setItem('creditCardExpiryDate', creditCardExpiryDate)
  localStorage.setItem('creditCardSecurityCode', creditCardSecurityCode)
  localStorage.setItem('homeAddress', homeAddress)
  localStorage.setItem('restaurantName', restaurantName)
}

export function clearAuth() {
  authState.role = null
  authState.userId  = null
  authState.restaurantId = null
  authState.firstName = null
  authState.lastName = null
  authState.email = null
  authState.password = null
  authState.contactNo = null
  authState.creditCardNo = null
  authState.creditCardName = null
  authState.creditCardExpiryDate = null
  authState.creditCardSecurityCode = null
  authState.homeAddress = null
  authState.restaurantName = null

  localStorage.removeItem('userRole')
  localStorage.removeItem('userId')
  localStorage.removeItem('restaurantId')
  localStorage.removeItem('firstName')
  localStorage.removeItem('lastName')
  localStorage.removeItem('email')
  localStorage.removeItem('password')
  localStorage.removeItem('contactNo')
  localStorage.removeItem('creditCardNo')
  localStorage.removeItem('creditCardName')
  localStorage.removeItem('creditCardExpiryDate')
  localStorage.removeItem('creditCardSecurityCode')
  localStorage.removeItem('homeAddress')
  localStorage.removeItem('restaurantName')
}
