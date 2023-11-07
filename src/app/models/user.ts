export interface User {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  token: string
}

export interface UserLogin {
  username: string,
  password: string
}

export interface UserRegistration {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string
}