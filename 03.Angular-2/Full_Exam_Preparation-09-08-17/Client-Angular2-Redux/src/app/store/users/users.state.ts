export interface IUserState {
  userRegistered: boolean,
  userAuthenticated:boolean,
  token:string,
  username:string
}

export const initialState: IUserState = {
  userRegistered: false,
  userAuthenticated: false,
  token: null,
  username: null
}