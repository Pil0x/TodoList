export interface IUserResponse {
  user: IUserData;
  token: string;
}

interface IUserData {
  id: string
  email: string;
  firstName: string;
  lastName: string;
}