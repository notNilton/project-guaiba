export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  backupEmail?: string;
  phoneNumber: string;
  age: number;
}

export interface IAuthResponse {
  id: string;
  name: string;
  email: string;
  backupEmail?: string;
  phoneNumber: string;
  age: number;
}
