export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  age: number;
  _id?: string;
}

export interface ApiData {
  data: User[] | User;
  message: string;
}
