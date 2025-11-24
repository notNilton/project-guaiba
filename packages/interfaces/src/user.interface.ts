export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  backupEmail?: string;
  phoneNumber: string;
  age: number;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  backupEmail?: string;
  phoneNumber: string;
  age: number;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  backupEmail?: string;
  phoneNumber?: string;
  age?: number;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  backupEmail?: string;
  phoneNumber: string;
  age: number;
}
